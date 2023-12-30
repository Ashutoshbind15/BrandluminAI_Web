import React from "react";
import PostListItem from "../components/Components/Posts/PostListItem";

const PostPage = () => {
  return (
    <div className="flex items-center flex-wrap">
      <div className="w-1/2 px-14">
        <PostListItem />
      </div>
      <div className="w-1/2 px-14">
        <PostListItem />
      </div>
      <div className="w-1/2 px-14">
        <PostListItem />
      </div>
    </div>
  );
};

export default PostPage;
