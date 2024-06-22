"use client";
import { useRouter } from "next/navigation";
import Redirect from "../components/Client/Redirectors/Redirect";
import { useIdeas } from "../utils/hooks/queries";
import { Button } from "../components/utilUI/ui/button";

const TagListRenderer = ({ tags }) => {
  return (
    <div className="flex items-center justify-center flex-wrap">
      {tags?.map((tag) => (
        <div key={tag} className="m-2 p-2 border-2 border-black rounded-lg">
          {tag}
        </div>
      ))}
    </div>
  );
};

const IdeaListItem = ({ idea }) => {
  const rtr = useRouter();

  return (
    <div className="w-1/4 p-3">
      <div className="border-2 border-black rounded-lg px-2 py-5">
        <div className="text-lg font-bold">{idea?.title}</div>
        <div className="text-sm">{idea?.description}</div>
        <div className="flex items-center my-2">
          <div className="text-sm font-bold flex-1">Type:</div>
          <TagListRenderer tags={idea?.type} />
        </div>

        <div className="flex items-center my-2">
          <div className="text-sm font-bold flex-1">Theme:</div>
          <TagListRenderer tags={idea?.theme} />
        </div>

        <div className="flex items-center my-2">
          <div className="text-sm font-bold flex-1">Audience Interests:</div>
          <TagListRenderer tags={idea?.audienceInterests} />
        </div>

        <div className="flex items-center my-2">
          <div className="text-sm font-bold flex-1">Media:</div>
          <TagListRenderer tags={idea?.media} />
        </div>

        <div>
          <Button
            onClick={() => {
              rtr.push(`/ideas/${idea?._id}/assistant`);
            }}
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
};

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
      <div className="w-full flex items-center justify-around flex-wrap">
        {ideas?.map((idea) => (
          <IdeaListItem key={idea?._id} idea={idea} />
        ))}
      </div>

      <div className="w-full flex items-center justify-center">
        <Redirect size="lg" url={"/ideas/generate"}>
          New Idea
        </Redirect>
      </div>
    </div>
  );
};

export default Ideas;
