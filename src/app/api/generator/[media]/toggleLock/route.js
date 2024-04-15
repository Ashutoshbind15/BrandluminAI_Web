import Idea from "@/app/models/Idea";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
  try {
    const { media } = params;
    const data = await req.json();

    const { ideaId } = data;

    const idea = await Idea.findById(ideaId);

    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    const mediaAssistant = idea.mediaAssistants.find(
      (assistant) => assistant.providerName === media
    );

    if (!mediaAssistant) {
      return NextResponse.json(
        { error: "Media assistant not found" },
        { status: 404 }
      );
    }

    mediaAssistant.isLocked = !mediaAssistant.isLocked;

    await idea.save();
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
};
