import Chat from "@/app/models/Chat";
import Idea from "@/app/models/Idea";
import MediaAssistant from "@/app/models/MediaAssistant";
import { connectDB } from "@/app/utils/db";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { media } = params;
};

export const POST = async (req, { params }) => {
  try {
    const { media } = params;
    const jsonbody = await req.json();
    const { prompt, config, ideaId } = jsonbody;

    const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    await connectDB();

    let chatId = -1;
    const ideaForChat = await Idea.findById(ideaId);

    const assistantExistsForMedia = ideaForChat.mediaAssistants.find(
      (assitant) => {
        assitant.providerName === media;
      }
    );

    if (!assistantExistsForMedia) {
      const chat = new Chat();

      const assistant = new MediaAssistant({
        providerName: media,
        isLocked: false,
        chat: chat._id,
      });

      ideaForChat.mediaAssistants.push(assistant);

      await assistant.save();
      await ideaForChat.save();

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
