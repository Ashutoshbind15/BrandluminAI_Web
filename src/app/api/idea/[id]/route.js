import Idea from "@/app/models/Idea";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;
  const idea = await Idea.findById(id).populate("chat");
  return NextResponse.json(idea, { status: 200 });
};
