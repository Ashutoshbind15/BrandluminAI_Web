import React from "react";

const IdeaList = ({ ideas }) => {
  return (
    <div className="flex flex-col w-full px-12 child:my-4 py-6 shadow-lg rounded-lg my-4">
      {ideas.map((idea, index) => {
        return (
          <div
            className="rounded-lg border-1 border-black px-4 py-2 flex"
            key={index}
          >
            <div>{idea.title}</div>
          </div>
        );
      })}
    </div>
  );
};

export default IdeaList;
