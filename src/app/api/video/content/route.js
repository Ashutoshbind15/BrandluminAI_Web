import Chat from "@/app/models/Chat";
import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";
import { generatePromptFromInsightsData } from "@/app/utils/helperfns";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const jsonbody = await req.json();
  const id = jsonbody.id;
  const media = jsonbody.media;
  let prompt = jsonbody.prompt;
  const config = jsonbody.config;
  await connectDB();

  const video = await Video.findById(id);

  if (!prompt) prompt = generatePromptFromInsightsData(video?.data, media);

  const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  let chatId = -1;

  if (!video.chat) {
    const chat = new Chat();
    video.chat = chat._id;
    await video.save();
    await chat.save();
    chatId = chat._id;
  } else {
    chatId = video.chat;
  }

  const model = generativeAI.getGenerativeModel({ model: "gemini-pro" });
  const history = await Chat.findById(chatId);
  const chat = model.startChat({
    history: history?.messages.map((message) => {
      return {
        role: message.role,
        parts: message.parts,
      };
    }),
    generationConfig: config,
  });

  const result = await chat.sendMessage(prompt);

  const userMessage = {
    role: "user",
    parts: prompt,
  };

  const response = await result.response;
  const text = response.text();

  const modelMessage = {
    role: "model",
    parts: text,
  };

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: [userMessage, modelMessage] } },
    { new: true }
  );

  console.log(updatedChat);

  return NextResponse.json(updatedChat, {
    status: 200,
  });
};
