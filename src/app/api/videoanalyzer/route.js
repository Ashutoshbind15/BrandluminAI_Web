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
    let accessToken = dbUser?.videoAccessToken;

    if (
      !accessToken ||
      !accessToken.length ||
      hasAnHourPassed(dbUser?.updatedAt)
    ) {
      console.log("renewal");
      const newToken = await getAccessToken();
      accessToken = newToken;

      await User.findByIdAndUpdate(user?.id, {
        videoAccessToken: newToken,
      });
    } else {
      console.log("no renewal");
    }

    const video = await uploadVideo(accessToken, url, name);
    const vid = video?.id;

    const dbVid = await Video.findOne({ fileUrl: url });
    dbVid.fileId = vid;

    await dbVid.save();

    return NextResponse.json(
      { video, url, name, dbid: dbVid._id },
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
        videoAccessToken: newToken,
      });

      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(error, { status: 500 });
  }
};

export const GET = async (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const sess = await getServerSession(authOptions);
    const user = sess?.user;

    await connectDB();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await User.findById(user?.id);
    let accessToken = dbUser?.videoAccessToken;

    if (
      !accessToken ||
      !accessToken.length ||
      hasAnHourPassed(dbUser?.updatedAt)
    ) {
      console.log("renewal");

      const newToken = await getAccessToken();
      accessToken = newToken;

      await User.findByIdAndUpdate(user?.id, {
        videoAccessToken: newToken,
      });
    } else {
      console.log("no renewal");
    }

    const video = await Video.findById(id);

    if (video?.data && Object.keys(video.data).length > 0) {
      return NextResponse.json(video.data, { status: 200 });
    }

    const analyzedVideo = await analyzeVideo(accessToken, video?.fileId);

    if (
      analyzedVideo.state === "Processed" &&
      Object.keys(video.data).length === 0
    ) {
      console.log("saving");
      video.data = analyzedVideo;
      await video.save();
    }

    return NextResponse.json(analyzedVideo, { status: 200 });
  } catch (error) {
    console.log(error);
    if (error.response.status === 401) {
      const newToken = await getAccessToken();
      await connectDB();

      const sess = await getServerSession(authOptions);
      const user = sess?.user;

      await User.findByIdAndUpdate(user?.id, {
        videoAccessToken: newToken,
      });

      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(error, { status: 500 });
  }
};
