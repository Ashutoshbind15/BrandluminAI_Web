import Idea from "@/app/models/Idea";
import { connectDB } from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const ideas = await Idea.find({});
    return NextResponse.json(ideas, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
