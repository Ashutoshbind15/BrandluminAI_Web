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
  });

  console.log(chatCompletion);

  return NextResponse.json(chatCompletion, { status: 200 });
};
