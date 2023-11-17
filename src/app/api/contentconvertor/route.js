import "server-only";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getPusherInstance } from "@/app/utils/pusher";

export const POST = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const jsonbody = await req.json();
  const { msgs } = jsonbody;

  // console.log(msgs[1].content);

  const chatCompletion = await openai.chat.completions.create({
    messages: msgs,
    model: "gpt-3.5-turbo",
    stream: true,
  });

  let curr = Date.now();

  const pusherInstance = getPusherInstance();

  for await (const message of chatCompletion) {
    const waitTime = (Date.now() - curr) / 1000;
    console.log(message?.choices[0]?.delta, waitTime);

    pusherInstance.trigger("chat", "sres", {
      message: message?.choices[0]?.delta,
      waitTime,
    });
  }

  return NextResponse.json({ msg: "success" }, { status: 200 });
};
