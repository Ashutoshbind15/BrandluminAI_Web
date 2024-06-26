import { getServerSession } from "next-auth";
import { createUploadthing } from "uploadthing/next";
import { authOptions } from "../auth/[...nextauth]/options";
import Video from "@/app/models/Video";
import User from "@/app/models/User";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const sess = await getServerSession(authOptions);
      console.log(sess);
      const user = sess?.user;

      // //   // If you throw, the user will not be able to upload
      if (!sess || !user) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),

  videoUploader: f({ video: { maxFileSize: "16MB" } })
    .middleware(async ({ req }) => {
      const sess = await getServerSession(authOptions);
      console.log(sess);
      const user = sess?.user;

      if (!sess || !user) throw new Error("Unauthorized");

      return { userId: user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      const dbUser = await User.findById(metadata.userId);
      const fileUrl = file.url;

      const video = await Video.create({
        fileUrl,
      });

      dbUser?.videos.push(video?._id);
      await dbUser?.save();
    }),
};
