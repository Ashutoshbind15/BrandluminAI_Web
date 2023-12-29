import {
  GithubFilled,
  GoogleOutlined,
  MediumSquareFilled,
} from "@ant-design/icons";
import React from "react";
import InfoCards from "../Dashboard/InfoCards";

const IdeaListItemSm = () => {
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
    </div>
  );
};

export default IdeaListItemSm;
