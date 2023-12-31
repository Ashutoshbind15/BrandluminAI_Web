import React from "react";
import PostListItem from "../components/Components/Posts/PostListItem";
import PostButton from "../components/Client/Buttons/page";

const PostPage = () => {
  return (
    <>
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

      <div className="w-full flex justify-center items-center">
        <PostButton className="my-4 w-1/5 py-3" />
      </div>
    </>
  );
};

export default PostPage;
