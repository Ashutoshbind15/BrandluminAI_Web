import {
  GithubFilled,
  GoogleOutlined,
  MediumSquareFilled,
  TagOutlined,
} from "@ant-design/icons";
import React from "react";
import InfoCards from "../Dashboard/InfoCards";

const IdeaListItemSm = ({ xs = false }) => {
  return (
    <div className="flex flex-col border-1 border-black pt-3 pb-1 rounded-b-lg px-2 my-4">
      <div className="text-xl font-bold">Idea</div>
      <div className="my-2 flex items-center">
        <div className="w-3/4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          voluptate nisi, consectetur
        </div>

        <div className="flex items-center flex-1 justify-end">
          <MediumSquareFilled />
          <GithubFilled />
          <GoogleOutlined />
        </div>
      </div>

      {!xs && (
        <div className="py-1 px-3 flex items-center justify-between">
          <div className="flex items-center">
            <InfoCards className={"border-1 border-slate-400 mx-2"}>
              Hello
            </InfoCards>
            <InfoCards className={"border-1 border-slate-400 mx-2"}>
              Hello
            </InfoCards>
            <InfoCards className={"border-1 border-slate-400 mx-2"}>
              Hello
            </InfoCards>
          </div>

          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-500 rounded-full border-1 border-blue-900 mx-1"></div>
            <div className="h-8 w-8 bg-blue-500 rounded-full border-1 border-blue-900 mx-1"></div>
            <div className="h-8 w-8 bg-blue-500 rounded-full border-1 border-blue-900 mx-1"></div>
          </div>
        </div>
      )}

      {!!xs && (
        <div className="flex items-center w-full justify-between border-t-1 border-black">
          <div className="flex items-center gap-1 pt-1">
            <div className="py-0.5 rounded-lg px-1.5 border-1 border-black mx-1 flex items-center">
              <TagOutlined />
              <span className="font-light text-sm">Prod</span>
            </div>
            <div className="py-0.5 rounded-lg px-1.5 border-1 border-black mx-1 flex items-center">
              <TagOutlined />
              <span className="font-light text-sm">Prod</span>
            </div>
            <div className="py-0.5 rounded-lg px-1.5 border-1 border-black mx-1 flex items-center">
              <TagOutlined />
              <span className="font-light text-sm">Prod</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="h-4 w-4 bg-blue-500 rounded-full border-1 border-blue-900 mx-0.5"></div>
            <div className="h-4 w-4 bg-blue-500 rounded-full border-1 border-blue-900 mx-0.5"></div>
            <div className="h-4 w-4 bg-blue-500 rounded-full border-1 border-blue-900 mx-0.5"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaListItemSm;
