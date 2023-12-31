import React from "react";
import IdeaListItemLg from "../components/Components/Ideas/IdeaListItemLg";
import Redirect from "../components/Client/Redirectors/Redirect";

const Ideas = () => {
  return (
    <div className="py-6 px-12">
      <IdeaListItemLg />
      <IdeaListItemLg />
      <IdeaListItemLg />

      <div className="w-full flex items-center justify-center">
        <Redirect size="lg" url={"/ideas/generate"}>
          New Idea
        </Redirect>
      </div>
    </div>
  );
};

export default Ideas;
