import User from "@/app/models/User";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import Account from "@/app/models/Account";
import LinkedInProvider from "next-auth/providers/linkedin";

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
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          scope: "openid https://www.googleapis.com/auth/youtube.force-ssl",
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID ?? "",
      clientSecret: process.env.LINKEDIN_SECRET ?? "",

      authorization: {
        params: {
          scope: "openid profile email w_member_social",
        },
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
        };
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
