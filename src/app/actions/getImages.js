//actions/getUsers.ts
"use server";

import { getServerSession } from "next-auth";
import { connectDB } from "../utils/db";
import { Image } from "../models/Image";
import { authOptions } from "../api/auth/[...nextauth]/options";

export const getImages = async (offset, limit) => {
  try {
    await connectDB();
    const sess = await getServerSession(authOptions);

    if (!sess || !sess.user) {
      return [];
    }

    const imgs = await Image.find({}).skip(offset).limit(limit);
    return imgs;
  } catch (error) {
    console.log(error);
    throw new Error(`An error happened: ${error}`);
  }
};
