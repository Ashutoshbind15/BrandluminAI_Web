"use client";

import InfoCards from "@/app/components/Components/Dashboard/InfoCards";
import { Button } from "@/app/components/utilUI/ui/button";
import { generatePromptFromIdea } from "@/app/utils/helperfns";
import { useIdea } from "@/app/utils/hooks/queries";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PostAssistant = ({ params }) => {
  const { id } = params;
  const { idea, ideaError, isIdeaError, isIdeaLoading } = useIdea(id);
  const [promptText, setPromptText] = useState("");
  const [messagesState, setMessagesState] = useState([]);

  useEffect(() => {
    if (idea) {
      if (idea.chat) setMessagesState(idea.chat.messages);
    }
  }, [idea]);

  if (isIdeaLoading) {
    return <div>Loading...</div>;
  }

  if (isIdeaError) {
    return <div>Error: {ideaError.message}</div>;
  }

  return (
    <div className="flex justify-center pt-20">
      <div className="w-3/4 shadow-lg flex flex-col justify-between h-96 overflow-y-auto">
        <div className="px-6 pt-6">
          {idea?.chat ? (
            <div className="w-full flex flex-col items-center">
              <div>Chat</div>
              {messagesState?.map((msg, i) => {
                return (
                  <div
                    className={`py-4 px-6 w-1/2 my-8 rounded-xl shadow-md ${
                      msg.role === "user" ? "self-end" : "self-start"
                    }`}
                    key={i}
                  >
                    <div>{msg?.parts}</div>
                    {msg.role === "model" && (
                      <div className="border-t-1 border-black py-1 mt-2">
                        <InfoCards className={"w-1/3"}>
                          <p className="font-light text-sm">Use as base</p>
                        </InfoCards>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <div>No chat</div>
              <Button
                onClick={async () => {
                  const { data } = await axios.post("/api/generator", {
                    prompt: generatePromptFromIdea(idea),
                    ideaId: idea._id,
                  });

                  const msgs = data.messages;
                  setMessagesState(msgs);
                }}
              >
                Start Chat
              </Button>
            </div>
          )}
        </div>

        <div className="h-12 border-t-1 border-black px-2 mb-1 flex items-center justify-between">
          <input
            className="flex-1 font-light tracking-wide outline-none"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Type to generate posts using AI..."
          />
          <SendOutlined
            className="text-xl"
            onClick={async () => {
              setMessagesState((p) =>
                p.concat({ role: "user", parts: promptText })
              );

              const { data } = await axios.post("/api/generator", {
                prompt: promptText,
                ideaId: idea._id,
              });

              const msgs = data.messages;
              const lastModelMsg = msgs[msgs.length - 1];

              setMessagesState((p) => [...p, lastModelMsg]);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PostAssistant;
