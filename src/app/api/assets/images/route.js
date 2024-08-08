import { openai } from "@/app/lib/openai";
import { uploadImageFromUri } from "@/app/utils/apis/imageHelpers";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Image } from "@/app/models/Image";
import { connectDB } from "@/app/utils/db";

export const POST = async (req, { params }) => {
  await connectDB();
  const sess = await getServerSession(authOptions);

  if (!sess) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uid = sess.user.id;

  if (!uid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const prompt = body.prompt;
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      user: uid,
    });
    const image_url = response.data[0].url;
    const res = await uploadImageFromUri(image_url);
    if (res.success) {
      const img = new Image({
        title: body.prompt,
        url: res.url,
        user: uid,
      });

      await img.save();

      return NextResponse.json({ url: res.url }, { status: 200 });
    } else {
      return NextResponse.json({ error: "error" }, { status: 500 });
    }
  } catch (err) {
    console.error("error", err);
    return NextResponse.json({ error: "error" }, { status: 500 });
  }
};
