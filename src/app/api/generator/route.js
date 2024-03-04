import Chat from "@/app/models/Chat";
import Idea from "@/app/models/Idea";
import { connectDB } from "@/app/utils/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const jsonbody = await req.json();
    const { prompt, config, ideaId } = jsonbody;

    const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    await connectDB();

    let chatId = -1;
    const ideaForChat = await Idea.findById(ideaId);

    if (!ideaForChat.chat) {
      const chat = new Chat();
      ideaForChat.chat = chat._id;
      await ideaForChat.save();
      await chat.save();
      chatId = chat._id;
    } else {
      chatId = ideaForChat.chat;
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
  } catch (error) {
    console.error(error);
    return NextResponse.error("Internal Server Error", {
      status: 500,
    });
  }
};
