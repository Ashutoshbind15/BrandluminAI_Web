import User from "@/app/models/User";
import { connectDB } from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const users = await User.find({}).select(
      "-password -salt -__v -accessTokens -refreshTokens -accounts -createdAt -updatedAt"
    );
    return NextResponse.json(users, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ msg: "Err" }, { status: 500 });
  }
};
