import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import {
  analyzeVideo,
  getAccessToken,
  uploadVideo,
} from "@/app/utils/apis/videoIndexer";
import { connectDB } from "@/app/utils/db";
import Video from "@/app/models/Video";

function hasAnHourPassed(lastUpdated) {
  const lastUpdatedDate = new Date(lastUpdated);
  const currentTime = new Date();
  const timeDifference = currentTime - lastUpdatedDate;

  const hoursDifference = timeDifference / (1000 * 60 * 60);
  return hoursDifference >= 1;
}

export const POST = async (req, res) => {
  const jsonbody = await req.json();
  const { url, name } = jsonbody;

  try {
    await connectDB();

    const sess = await getServerSession(authOptions);
    const user = sess?.user;
    const dbUser = await User.findById(user?.id);
    const accessToken = dbUser?.accessToken;

    if (!accessToken || hasAnHourPassed(dbUser?.updatedAt)) {
      console.log("renewal");
    } else {
      console.log("no renewal");
    }

    const video = await uploadVideo(accessToken, url, name);
    const vid = video?.id;

    let getter = await analyzeVideo(accessToken, vid);

    while (getter?.state !== "Processed") {
      //set delay of 5 seconds

      //have a real time data push in here
      await new Promise((resolve) => setTimeout(resolve, 5000));
      console.log("waiting for video to be processed");
      getter = await analyzeVideo(accessToken, vid);
      console.log(getter?.state);
    }

    console.log(getter);

    const dbVideo = await Video.findOne({ fileUrl: url });

    const updatedVideo = await Video.findByIdAndUpdate(
      dbVideo?._id,
      {
        data: { insights: getter?.summarizedInsights, videos: getter?.videos },
        fileId: vid,
      },
      { new: true }
    );

    return NextResponse.json(
      { video, url, name, updatedVideo },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      const newToken = await getAccessToken();
      await connectDB();

      const sess = await getServerSession(authOptions);
      const user = sess?.user;

      await User.findByIdAndUpdate(user?.id, {
        accessToken: newToken,
      });

      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(error, { status: 500 });
  }
};
