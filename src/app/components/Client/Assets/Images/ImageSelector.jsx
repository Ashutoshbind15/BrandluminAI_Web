"use client";
import { getImages } from "@/app/actions/getImages";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/app/components/utilUI/ui/input";
import { Button } from "@/app/components/utilUI/ui/button";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";
const take = 2;

const ImageCard = ({ image, selected, setSelected }) => {
  return (
    <div
      className={`cursor-pointer ${
        selected?.url === image.url ? "border-2 border-blue-500" : ""
      }
      `}
      onClick={() => {
        setSelected(image);
      }}
    >
      <Image src={image.url} width={50} height={50} alt={image.title} />
    </div>
  );
};

export default function ImageSelector({
  initialImages,
  onSelected,
  selected,
  setSelected,
}) {
  const [offset, setOffset] = useState(0);
  const [images, setImages] = useState(initialImages);
  const [imagePrompt, setImagePrompt] = useState("");

  // wrap the function in useCallback

  const loadMoreImages = useCallback(async () => {
    try {
      const newImages = await getImages(offset, take);
      console.log("newImages", newImages);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setOffset((prevOffset) => prevOffset + take);
    } catch (error) {
      console.log(error);
    }
  }, [offset]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-3">
        <Input
          placeholder="Generate image assets"
          value={imagePrompt}
          onChange={(e) => setImagePrompt(e.target.value)}
        />

        <Button
          onClick={async () => {
            toast.loading("Generating image assets", {
              duration: 300000,
              id: "generate-image-assets",
            });

            const { data } = await axios.post("/api/assets/images", {
              prompt: imagePrompt,
            });

            setImages((prevImages) => [
              {
                _id: prevImages.length + 1,
                title: imagePrompt,
                url: data.url,
              },
              ...prevImages,
            ]);

            toast.dismiss("generate-image-assets");
          }}
        >
          Generate image assets
        </Button>
      </div>

      <div className="flex flex-wrap items-center justify-around">
        {images?.length ? (
          images?.map((image) => (
            <ImageCard
              key={image._id}
              image={image}
              selected={selected}
              setSelected={setSelected}
            />
          ))
        ) : (
          <p className="text-center">No images found</p>
        )}
      </div>

      <Button onClick={() => onSelected(selected)}>Select</Button>
      <Button onClick={loadMoreImages}>Load more</Button>
    </div>
  );
}
