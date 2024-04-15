import Chat from "@/app/models/Chat";
import Idea from "@/app/models/Idea";
import MediaAssistant from "@/app/models/MediaAssistant";
import { connectDB } from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const ideas = await Idea.find({}).populate({
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
    const jsonBody = await req.json();

    // extract media types from the jsonBody and remove those from it

    const media = jsonBody.media;

    // have a new object from jsonbody without the media

    const newBody = { ...jsonBody };
    delete newBody.media;

    const idea = await Idea.create(jsonBody);

    const mediaAssistants = [];

    for (let med of media) {
      const medName = med;
      const assistant = new MediaAssistant({
        providerName: medName,
        isLocked: False,
      });
    }

    return NextResponse.json(idea, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
