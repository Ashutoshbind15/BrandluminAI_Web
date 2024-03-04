import Chat from "@/app/models/Chat";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { cid } = params;

  const chat = await Chat.findById(cid);
  return NextResponse.json(chat, {
    status: 200,
  });
};
