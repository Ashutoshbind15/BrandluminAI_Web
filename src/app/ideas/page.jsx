"use client";
import IdeaListItemLg from "../components/Components/Ideas/IdeaListItemLg";
import Redirect from "../components/Client/Redirectors/Redirect";
import { useIdeas } from "../utils/hooks/queries";

const Ideas = () => {
  const { ideas, ideasError, isIdeasError, isIdeasLoading } = useIdeas();

  if (isIdeasLoading) {
    return <div>Loading...</div>;
  }

  if (isIdeasError) {
    return <div>Error: {ideasError.message}</div>;
  }

  console.log(ideas);
  return (
    <div className="py-6 px-12">
      {ideas?.map((idea) => (
        <IdeaListItemLg
          key={idea?._id}
          description={idea?.description}
          media={idea?.media}
          tags={idea?.type}
        />
      ))}

      <div className="w-full flex items-center justify-center">
        <Redirect size="lg" url={"/ideas/generate"}>
          New Idea
        </Redirect>
      </div>
    </div>
  );
};

export default Ideas;
