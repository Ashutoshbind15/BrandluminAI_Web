import { cloudinary } from "@/app/lib/cloudinary";

export const uploadImageFromUri = async (dataUri) => {
  const result = {
    success: false,
    url: null,
  };

  try {
    const res = await cloudinary.uploader.upload(dataUri, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "assets:images",
    });

    result.success = true;
    result.url = res.secure_url;

    console.log(res);
  } catch (error) {
    console.error(error);
  }

  return result;
};
