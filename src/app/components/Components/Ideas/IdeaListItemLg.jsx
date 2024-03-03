import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MediumSquareFilled,
  TagFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
import React from "react";
import RoundedLists from "../../UI/Buttons/RoundedLists";
import InfoCards from "../Dashboard/InfoCards";

const mediaToIconsMap = {
  Instagram: <InstagramFilled className="text-3xl px-4" />,
  Facebook: <FacebookFilled className="text-3xl px-4" />,
  Linkedin: <LinkedinFilled className="text-3xl px-4" />,
  Medium: <MediumSquareFilled className="text-3xl px-4" />,
  Twitter: <TwitterCircleFilled className="text-3xl px-4" />,
};

const IdeaListItemLg = ({
  description = "Little description written by me",
  title = "Idea",
  media = ["Instagram", "Facebook", "Linkedin"],
  tags = ["Tag 1", "Tag 2", "Tag 3"],
}) => {
  return (
    <div className="border-y-1 border-black py-4 flex items-center justify-around my-8">
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-sm font-light max-w-xs">{description}</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold">{title}</div>
        <div className="text-sm font-light max-w-xs">{description}</div>

        <div className="flex items-center flex-wrap w-full">
          {media.map((md) => mediaToIconsMap[md])}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center flex-wrap w-full">
          {media.map((md) => mediaToIconsMap[md])}
        </div>
        <div className="flex items-center flex-wrap w-full">
          {media.map((md) => mediaToIconsMap[md])}
        </div>
      </div>

      <div className="flex flex-col items-end">
        <RoundedLists />

        <div className="flex items-center gap-2">
          {tags.map((tag) => (
            <InfoCards key={tag}>
              <div className="flex gap-2 items-center">
                <TagFilled className="text-2xl" />
                <div className="text-sm font-light">{tag}</div>
              </div>
            </InfoCards>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IdeaListItemLg;
