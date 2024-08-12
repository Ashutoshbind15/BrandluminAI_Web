"use client";
import { getImages } from "@/app/actions/getImages";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ImageCard from "./ImageCard";
import { Input } from "@/app/components/utilUI/ui/input";
import { Button } from "@/app/components/utilUI/ui/button";
import axios from "axios";
import { toast } from "sonner";

const take = 10;

export default function ImageList({ initialImages }) {
  const [offset, setOffset] = useState(take);
  const [images, setImages] = useState(initialImages);
  const [isMore, setIsMore] = useState(true);

  const [imagePrompt, setImagePrompt] = useState("");

  const { ref, inView } = useInView();

  // wrap the function in useCallback

  const loadMoreImages = useCallback(async () => {
    try {
      const newImages = await getImages(offset, take);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setOffset((prevOffset) => prevOffset + take);

      if (newImages.length < take) {
        setIsMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [offset]);

  useEffect(() => {
    if (inView) {
      if (isMore) {
        loadMoreImages();
      }
    }
  }, [inView, loadMoreImages, isMore]);

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
          images?.map((image) => <ImageCard key={image._id} image={image} />)
        ) : (
          <p className="text-center">No images found</p>
        )}
      </div>
      {/* <button onClick={loadMoreImages}>Load more</button> */}
      {isMore && <div ref={ref}>Loading... </div>}
    </div>
  );
}
