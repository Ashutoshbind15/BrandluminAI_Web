import User from "@/app/models/User";
import Video from "@/app/models/Video";
import { connectDB } from "@/app/utils/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import Chat from "@/app/models/Chat";

export const GET = async (req) => {
  try {
    await connectDB();

    const sess = await getServerSession(authOptions);
    const uid = sess?.user?.id;

    const user = await User.findById(uid).populate([
      {
        path: "videos",
        model: Video,
        populate: [
          {
            path: "chat",
            model: Chat,
          },
        ],
      },
    ]);

    return NextResponse.json(user?.videos);
  } catch (err) {
    return NextResponse.error(err);
  }
};
