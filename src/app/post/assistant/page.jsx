"use client";

import InfoCards from "@/app/components/Components/Dashboard/InfoCards";
import IdeaListItemSm from "@/app/components/Components/Ideas/IdeaListItemSm";
import SideBars from "@/app/components/Layout/SideBars";
import TopBars from "@/app/components/Layout/TopBars";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import {
  FacebookOutlined,
  InstagramOutlined,
  MediumOutlined,
  SendOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

const PostAssistant = () => {
  const [sideTopBarState, setSideTopBarState] = useState("Iterations");
  const [topBarState, setTopBarState] = useState("Post 1");
  const [socialState, setSocialState] = useState("Instagram");

  return (
    <div className="flex items-stretch h-screen">
      <div className="w-1/4 px-10 flex flex-col justify-around">
        <IdeaListItemSm xs={true} />
        <div className="">
          <TopBars
            state={sideTopBarState}
            setState={setSideTopBarState}
            listItems={["Iterations", "Theme"]}
            parentStyles={"my-6"}
            selectedItemStyles={"bg-white text-black"}
          />

          <div className="w-full flex items-center flex-wrap pl-2">
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className="w-3/4 flex items-stretch">
        <div className="w-3/4 border-x-1 border-black flex flex-col justify-between">
          <TopBars
            listItems={["Post 1", "Post 2", "Post 3"]}
            state={topBarState}
            setState={setTopBarState}
            selectedItemStyles={"bg-white text-black"}
            parentStyles={"py-4 border-y-1 border-black"}
          />
          <div className="flex-1 overflow-y-auto px-6 py-10 flex flex-col">
            <div className="py-4 px-6 w-1/2 my-8 rounded-xl btm-shadow">
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
                sapiente soluta quibusdam explicabo officiis impedit quia rerum,
                ipsa velit laudantium dolor aliquam deserunt, earum magni
                tenetur id fugit assumenda deleniti!
              </div>
              <div className="border-t-1 border-black py-1 mt-2">
                <InfoCards className={"w-1/3"}>
                  <p className="font-light text-sm">Use as base</p>
                </InfoCards>
              </div>
            </div>
            <div className="py-4 px-6 w-1/2 my-4 self-end rounded-xl btm-shadow">
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
                sapiente soluta quibusdam explicabo officiis impedit quia rerum,
                ipsa velit laudantium dolor aliquam deserunt, earum magni
                tenetur id fugit assumenda deleniti!
              </div>
              <div className="border-t-1 border-black py-1 mt-2">
                <InfoCards className={"w-1/3"}>
                  <p className="font-light text-sm">Use as base</p>
                </InfoCards>
              </div>
            </div>
            <div className="py-4 px-6 w-1/2 my-8 rounded-xl btm-shadow">
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
                sapiente soluta quibusdam explicabo officiis impedit quia rerum,
                ipsa velit laudantium dolor aliquam deserunt, earum magni
                tenetur id fugit assumenda deleniti!
              </div>
              <div className="border-t-1 border-black py-1 mt-2">
                <InfoCards className={"w-1/3"}>
                  <p className="font-light text-sm">Use as base</p>
                </InfoCards>
              </div>
            </div>
          </div>
          <div className="h-12 bg-gray-200 flex items-center justify-between px-4">
            <div className="font-light tracking-wide">
              Type to generate posts using AI
            </div>
            <SendOutlined className="text-xl" />
          </div>
        </div>
        <div className="w-1/4 flex">
          <SideBars
            elements={[
              "Post 1",
              "Post 2",
              "Post 3",
              "Post 4",
              "Post 5",
              "Post 6",
              "Post 7",
              "Post 8",
              "Post 9",
              "Post 10",
            ]}
            keyedElements={[
              {
                key: "Instagram",
                element: <InstagramOutlined className="text-xl" />,
              },
              {
                key: "Facebook",
                element: <FacebookOutlined className="text-xl" />,
              },
              {
                key: "YouTube",
                element: <YoutubeOutlined className="text-xl" />,
              },
              {
                key: "Twitter",
                element: <TwitterOutlined className="text-xl" />,
              },
              {
                key: "Medium",
                element: <MediumOutlined className="text-xl" />,
              },
              {
                key: "Send",
                element: <SendOutlined className="text-xl" />,
              },
            ]}
            sideBarState={socialState}
            className={
              "self-stretch flex flex-col gap-2 py-24 px-10 border-r-1 border-black"
            }
            setSideBarState={setSocialState}
          />
        </div>
      </div>
    </div>
  );
};

export default PostAssistant;
