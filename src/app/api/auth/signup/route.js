import User from "@/app/models/User";
import { getAccessToken } from "@/app/utils/apis/videoIndexer";
import { connectDB } from "@/app/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();

  const jsonbody = await req.json();
  const { username, password, role, email } = jsonbody;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name: username,
    password: hashedPassword,
    role: role,
    email,
  });

  if (user) {
    const videoIndexerAccessToken = await getAccessToken();

    user.accessToken = videoIndexerAccessToken;

    await user.save();
  }

  return NextResponse.json(user, { status: 201 });
}
