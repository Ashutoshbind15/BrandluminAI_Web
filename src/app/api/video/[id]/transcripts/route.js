import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  console.log(params);

  await connectDB();

  const vid = await Video.findById(params.id);
  const vidsData = vid?.data?.videos;
  const vidData = vidsData.length > 0 ? vidsData[0] : null;

  if (!vidData) {
    return NextResponse.next();
  }

  const vidInsights = vidData?.insights;
  const vidTranscripts = vidInsights?.transcript;

  const speakerToScriptMap = new Map();

  for (const transcript of vidTranscripts) {
    const { speakerId, text } = transcript;

    if (!speakerToScriptMap.has(speakerId)) {
      speakerToScriptMap.set(speakerId, []);
    }

    const speakerScript = speakerToScriptMap.get(speakerId);

    speakerScript.push(text);
  }

  let speakerToScript = [];

  for (const [speakerId, script] of speakerToScriptMap.entries()) {
    speakerToScript.push({ speakerId, script });
  }

  return NextResponse.json(
    { transcript: speakerToScript, completeTranscripts: vidTranscripts },
    { status: 200 }
  );
};
