import {
  GoogleCircleFilled,
  InstagramFilled,
  TagFilled,
  TwitterCircleFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import React from "react";
import RoundedLists from "../../UI/Buttons/RoundedLists";
import InfoCards from "../Dashboard/InfoCards";

const IdeaListItemLg = () => {
  return (
    <div className="border-y-1 border-black py-4 flex items-center justify-around my-4">
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold">Idea</div>
        <div className="text-sm font-light">
          Little description written by me
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-xl font-semibold">Idea</div>
        <div className="text-sm font-light">
          Little description written by me
        </div>

        <div className="flex items-center flex-wrap w-full">
          <GoogleCircleFilled className="text-3xl px-4" />
          <YoutubeFilled className="text-3xl px-4" />
          <InstagramFilled className="text-3xl px-4" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center flex-wrap w-full">
          <TwitterCircleFilled className="text-3xl px-4" />
          <GoogleCircleFilled className="text-3xl px-4" />
          <YoutubeFilled className="text-3xl px-4" />
        </div>
        <div className="flex items-center flex-wrap w-full">
          <TwitterCircleFilled className="text-3xl px-4" />
          <GoogleCircleFilled className="text-3xl px-4" />
          <YoutubeFilled className="text-3xl px-4" />
        </div>
      </div>

      <div className="flex flex-col items-end">
        <RoundedLists />

        <div className="flex items-center gap-2">
          <InfoCards>
            <div className="flex gap-2 items-center">
              <TagFilled className="text-2xl" />
              <div className="text-sm font-light">Tags</div>
            </div>
          </InfoCards>
          <InfoCards>
            <div className="flex gap-2 items-center">
              <TagFilled className="text-2xl" />
              <div className="text-sm font-light">Tags</div>
            </div>
          </InfoCards>
          <InfoCards>
            <div className="flex gap-2 items-center">
              <TagFilled className="text-2xl" />
              <div className="text-sm font-light">Tags</div>
            </div>
          </InfoCards>
        </div>
      </div>
    </div>
  );
};

export default IdeaListItemLg;
