import Chat from "@/app/models/Chat";
import Idea from "@/app/models/Idea";
import { connectDB } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";

export const GET = async (req, res) => {
  try {
    await connectDB();

    const sess = await getServerSession(authOptions);
    const uid = sess?.user?.id;

    if (!sess || !uid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const ideas = await Idea.find({
      user: uid,
    }).populate({
      path: "chat",
      model: Chat,
    });
    return NextResponse.json(ideas, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};

export const POST = async (req, res) => {
  try {
    await connectDB();
    const sess = await getServerSession(authOptions);
    const uid = sess?.user?.id;

    if (!sess || !uid) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const jsonBody = await req.json();
    const idea = await Idea.create(jsonBody);
    idea.user = uid;
    await idea.save();

    return NextResponse.json(idea, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
