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

  const isFBConnected = user.accounts.some(
    (account) => account.provider === "facebook"
  );

  if (!isFBConnected) {
    return NextResponse.json(
      { error: "FB not connected" },
      {
        status: 401,
      }
    );
  }

  const FBAccessToken = user.accounts.find(
    (account) => account.provider === "facebook"
  ).accessToken;

  const FBuid = user.accounts.find(
    (account) => account.provider === "facebook"
  ).userId;

  const { data } = await axios.get(
    `https://graph.facebook.com/v19.0/me/accounts?access_token=${FBAccessToken}`
  );

  return NextResponse.json(data, {
    status: 200,
  });
};

export const POST = async (req) => {
  const jsonBody = await req.json();
  const { page_access_token, page_id, message } = jsonBody;

  const { data: pageData } = await axios.post(
    `https://graph.facebook.com/v19.0/${page_id}/feed`,
    {
      message,
      access_token: page_access_token,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return NextResponse.json(pageData, {
    status: 200,
  });
};
