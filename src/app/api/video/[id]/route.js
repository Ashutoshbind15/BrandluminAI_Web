import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  console.log(params);
  await connectDB();
  const vid = await Video.findById(params.id);
  return NextResponse.json(vid, { status: 200 });
};
