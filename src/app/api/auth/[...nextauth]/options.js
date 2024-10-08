import User from "@/app/models/User";
import Account from "@/app/models/Account";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        await connectDB();

        const { email, password } = credentials;
        const user = await User.findOne({ email: email });
        if (!user) return null;

        const plaintextPassword = password;
        const userSalt = user.salt;

        const hashedPassword = await bcrypt.hash(
          plaintextPassword,
          userSalt ?? ""
        );

        const isAuth = hashedPassword === user.password;

        if (!isAuth) return null;

        return {
          id: user._id,
          role: user.role ? user.role : process.env.ROLE_BASIC,
        };
      },
    }),

    FacebookProvider({
      clientId: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
      authorization: {
        params: {
          scope:
            "instagram_content_publish pages_manage_posts business_management pages_manage_metadata",
        },
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      // console.log("jtoken", token, "juser", user);

      if (account && account.provider !== "credentials") {
        const appAccount = await Account.findOne({
          provider: account.provider,
          accountId: account.providerAccountId,
        });

        console.log(appAccount, "appAccount");

        if (appAccount) {
          token.user = { id: appAccount.userId };
        }
      } else if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      // console.log("stoken", token, "ssession", session);
      session.user = token.user;
      return session;
    },
    signIn: async (params) => {
      const { account, user } = params;
      const currSession = await getServerSession(authOptions);

      console.log("currSession", currSession);

      // disallow to sign in with social accounts
      if (!currSession && account.provider !== "credentials") {
        return false;
      }

      // check if user is already signed in with credentials
      if (currSession && account.provider === "credentials") {
        return false;
      }

      if (currSession) {
        console.log("signed in with credentials");
        // means that user is already signed in with credentials

        await connectDB();

        if (account.provider !== "credentials") {
          // user wants to link app account or to refresh token
          // check if app account is already linked

          const appAccount = await Account.findOne({
            provider: account.provider,
            userId: currSession.user.id,
          });

          if (appAccount) {
            const newAccessToken = account.access_token;
            const newRefreshToken = account.refresh_token;

            appAccount.accessToken = newAccessToken;
            appAccount.refreshToken = newRefreshToken;

            await appAccount.save();
          } else {
            const acc = await Account.create({
              provider: account.provider,
              userId: currSession.user.id,
              accessToken: account.access_token,
              refreshToken: account.refresh_token,
              accountId: account.providerAccountId,
            });

            await User.findByIdAndUpdate(currSession.user.id, {
              $push: { accounts: acc._id },
            });
          }
        }
      }

      return true;
    },
  },
};
