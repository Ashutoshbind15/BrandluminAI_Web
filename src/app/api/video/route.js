import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    const videos = await Video.find({}).populate("chat");
    return NextResponse.json(videos);
  } catch (err) {
    return NextResponse.error(err);
  }
};
