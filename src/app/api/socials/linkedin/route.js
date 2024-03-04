import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import User from "@/app/models/User";
import { connectDB } from "@/app/utils/db";
import Account from "@/app/models/Account";
import Video from "@/app/models/Video";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  const sess = await getServerSession(authOptions);
  if (!sess)
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  const uid = sess.user.id;

  const user = await User.findById(uid).populate([
    {
      path: "accounts",
      model: Account,
    },
    {
      path: "videos",
      model: Video,
    },
  ]);

  const isLinkedinConnected = user.accounts.some(
    (account) => account.provider === "linkedin"
  );

  if (!isLinkedinConnected) {
    return NextResponse.json(
      { error: "Linkedin not connected" },
      {
        status: 401,
      }
    );
  }

  const linkedinAccessToken = user.accounts.find(
    (account) => account.provider === "linkedin"
  ).accessToken;

  const { data } = await axios.get(`https://api.linkedin.com/v2/userinfo`, {
    headers: {
      Authorization: `Bearer ${linkedinAccessToken}`,
    },
  });

  return NextResponse.json(data, {
    status: 200,
  });
};

export const POST = async (req) => {
  const jsonBody = await req.json();
  const author = jsonBody.author;

  const testBody = {
    author: author,
    lifecycleState: "PUBLISHED",
    specificContent: {
      "com.linkedin.ugc.ShareContent": {
        shareCommentary: {
          text: "Hello World! This is my first Share on LinkedIn!",
        },
        shareMediaCategory: "NONE",
      },
    },
    visibility: {
      "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS",
    },
  };

  const sess = await getServerSession(authOptions);
  if (!sess)
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );

  const uid = sess.user.id;

  const user = await User.findById(uid).populate([
    {
      path: "accounts",
      model: Account,
    },
    {
      path: "videos",
      model: Video,
    },
  ]);

  const isLinkedinConnected = user.accounts.some(
    (account) => account.provider === "linkedin"
  );

  if (!isLinkedinConnected) {
    return NextResponse.json(
      { error: "Linkedin not connected" },
      {
        status: 401,
      }
    );
  }

  const linkedinAccessToken = user.accounts.find(
    (account) => account.provider === "linkedin"
  ).accessToken;

  const { data } = await axios.post(
    `https://api.linkedin.com/v2/ugcPosts`,
    testBody,
    {
      headers: {
        Authorization: `Bearer ${linkedinAccessToken}`,
      },
    }
  );

  return NextResponse.json(data, {
    status: 201,
  });
};
