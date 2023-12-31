"use client";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import { useRouter } from "next/navigation";

const PostButton = ({ className }) => {
  const rtr = useRouter();
  return (
    <PrimaryButton
      onClick={() => rtr.push("/post/generate")}
      className={className}
    >
      New Post
    </PrimaryButton>
  );
};

export default PostButton;
