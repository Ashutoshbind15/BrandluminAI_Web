import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { Image } from "@/app/models/Image";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const jsonBody = await req.json();
  const { message, assetUrl } = jsonBody;

  const sess = await getServerSession(authOptions);
  const uid = sess.user.id;

  if (!sess || !uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUser = await User.findById(uid);

  if (!dbUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const page_id = dbUser.facebookPageId;
  const page_access_token = dbUser.facebookPageAccessToken;

  const imageUrl = assetUrl;

  const payLoad = {
    url: imageUrl,
    caption: message,
    access_token: page_access_token,
  };

  const response = await fetch(`https://graph.facebook.com/${page_id}/photos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payLoad),
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: 200,
  });
};
