import User from "@/app/models/User";
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

  return NextResponse.json(user);
}
