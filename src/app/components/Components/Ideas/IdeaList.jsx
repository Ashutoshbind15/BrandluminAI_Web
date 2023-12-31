import {
  GithubOutlined,
  GoogleOutlined,
  MediumOutlined,
  MediumSquareFilled,
} from "@ant-design/icons";
import React from "react";

const IdeaList = ({ ideas, addPost }) => {
  return (
    <div className="flex flex-col w-full px-12 child:my-2 py-6 rounded-lg my-4">
      {ideas && ideas.length ? (
        ideas.map((idea, index) => {
          return (
            <div
              className="border-y-1 border-black p-2 flex items-center justify-between"
              key={index}
              onClick={() => addPost(idea)}
            >
              <div className="flex flex-col w-2/3">
                <div className="font-semibold">{idea?.title}</div>
                <div className="font-light">
                  {idea?.description?.length
                    ? idea?.description
                    : "Lorem ipsum delor random text hahaha yo yo yo"}
                </div>
              </div>

              <div className="flex items-center">
                <MediumOutlined />
                <GithubOutlined />
                <GoogleOutlined />
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center">No ideas here yet!</div>
      )}
    </div>
  );
};

export default IdeaList;
