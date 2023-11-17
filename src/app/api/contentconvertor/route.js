import "server-only";

import { NextResponse } from "next/server";
import OpenAI from "openai";

export const POST = async (req, res) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const jsonbody = await req.json();
  const { msgs } = jsonbody;

  const chatCompletion = await openai.chat.completions.create({
    messages: msgs,
    model: "gpt-3.5-turbo",
    stream: true,
  });

  let curr = Date.now();

  for await (const message of chatCompletion) {
    const waitTime = (Date.now() - curr) / 1000;
    console.log(message?.choices[0]?.delta, waitTime);
  }

  return NextResponse.json({ chatCompletion: "" }, { status: 200 });
};
