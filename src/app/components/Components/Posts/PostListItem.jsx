"use client";

import React, { useState } from "react";
import TopBars from "../../Layout/TopBars";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  WechatOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import AnalyticsCardSm from "./AnalyticsCardSm";

const PostListItem = () => {
  const [state, setState] = useState("All");
  return (
    <div className="px-6 my-5 shadow-lg py-10">
      <TopBars
        state={state}
        setState={setState}
        listItems={[
          "All",
          "Instagram",
          "Facebook",
          "Twitter",
          "LinkedIn",
          "Youtube",
        ]}
        keyedItems={[
          {
            key: "All",
            element: (
              <div className="flex items-center">
                <span className="ml-2">All</span>
              </div>
            ),
          },
          {
            key: "Instagram",
            element: (
              <div className="flex items-center">
                <InstagramOutlined />
                <span className="ml-2">Instagram</span>
              </div>
            ),
          },
          {
            key: "Facebook",
            element: (
              <div className="flex items-center">
                <FacebookOutlined />
                <span className="ml-2">Facebook</span>
              </div>
            ),
          },
          {
            key: "Twitter",
            element: (
              <div className="flex items-center">
                <TwitterOutlined />
                <span className="ml-2">Twitter</span>
              </div>
            ),
          },
          {
            key: "LinkedIn",
            element: (
              <div className="flex items-center">
                <LinkedinOutlined />
                <span className="ml-2">LinkedIn</span>
              </div>
            ),
          },
          {
            key: "Youtube",
            element: (
              <div className="flex items-center">
                <YoutubeOutlined />
                <span className="ml-2">Youtube</span>
              </div>
            ),
          },
        ]}
        selectedItemStyles="bg-white text-black"
        parentStyles={"mb-2"}
      />

      <div className="text-3xl font-bold tracking-wider mt-4">Post title</div>
      <div className="font-light text-lg my-2 pr-16">
        Here are some details about the post. Some more details about the post.
        Some more details about the post.
      </div>

      <div className="flex w-full justify-between items-center px-4">
        <div className="flex flex-col">
          <div className="flex items-center">
            <AnalyticsCardSm val={100} />
            <AnalyticsCardSm val={205} />
            <AnalyticsCardSm val={34} />
          </div>
          <div className="flex items-center">
            <AnalyticsCardSm val={100} />
            <AnalyticsCardSm val={205} />
            <AnalyticsCardSm val={34} />
            <AnalyticsCardSm val={34} />
          </div>
        </div>
        <div className="flex items-center flex-col">
          <PrimaryButton className={"flex items-center rounded-xl my-2"}>
            <div className="px-3 my-2">Preview</div>
            <WechatOutlined className="text-2xl" />
          </PrimaryButton>
          <PrimaryButton className={"flex items-center rounded-xl my-2"}>
            <div className="px-3 my-2">Preview</div>
            <WechatOutlined className="text-2xl" />
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
