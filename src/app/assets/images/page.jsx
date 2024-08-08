import { getImages } from "@/app/actions/getImages";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import ImageList from "@/app/components/Client/Assets/Images/ImageList";
import { getServerSession } from "next-auth";

const take = 10;

const ImageAssetCollectionPage = async () => {
  const sess = await getServerSession(authOptions);
  const initialImages = await getImages(0, take);

  console.log("initialImages", initialImages);

  if (!sess || !sess.user) {
    return <div>Not logged in</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <ImageList initialImages={initialImages} />
      </div>
    </>
  );
};

export default ImageAssetCollectionPage;
