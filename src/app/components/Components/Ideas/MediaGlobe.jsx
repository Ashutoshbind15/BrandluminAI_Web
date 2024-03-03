import React from "react";
import AnimatedButton from "../../UI/Buttons/AnimatedButton";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MediumSquareFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import { useAtom } from "jotai";
import { ideaMediaAtom } from "@/app/utils/stateStore/ideaAtoms";

const mediaToIconsMap = {
  Instagram: <InstagramFilled />,
  Facebook: <FacebookFilled />,
  Linkedin: <LinkedinFilled />,
  Medium: <MediumSquareFilled />,
  Twitter: <TwitterCircleFilled />,
};

const Media = ({ text = "tag", isSet, toggleMedia }) => {
  return (
    <AnimatedButton selected={isSet} onClick={() => toggleMedia(text)}>
      <div className="flex items-center justify-around gap-2">
        {mediaToIconsMap[text]}
        <div>{text}</div>
      </div>
    </AnimatedButton>
  );
};

const MediaGlobe = () => {
  const [medias, setMedias] = useAtom(ideaMediaAtom);

  return (
    <div className="py-6">
      <div className="grid grid-cols-4 gap-x-1 items-center">
        <p className="font-bold text-xl pl-4">
          Where do u plan to post this idea?
        </p>
        <div className="col-span-3 grid grid-cols-4 gap-y-4">
          {Object.keys(mediaToIconsMap).map((media) => (
            <Media
              text={media}
              isSet={medias.includes(media)}
              key={media}
              toggleMedia={() =>
                setMedias((prevMedias) =>
                  prevMedias.includes(media)
                    ? prevMedias.filter((item) => item !== media)
                    : [...prevMedias, media]
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaGlobe;
