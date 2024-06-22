"use client";

import InfoCards from "@/app/components/Components/Dashboard/InfoCards";
import { Button } from "@/app/components/utilUI/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/utilUI/ui/dialog";
import { generatePromptFromIdea } from "@/app/utils/helperfns";
import { useIdea, useUser } from "@/app/utils/hooks/queries";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PostAssistant = ({ params }) => {
  const { id } = params;
  const { idea, ideaError, isIdeaError, isIdeaLoading } = useIdea(id);
  const [promptText, setPromptText] = useState("");
  const [messagesState, setMessagesState] = useState([]);

  const { user, isUserLoading, isUserError, userError, refetchUser } =
    useUser();

  const [accounts, setAccounts] = useState([]);

  const supportedMedia = ["facebook"];

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
                          <Dialog>
                            <DialogTrigger>
                              <p className="font-light text-sm">Use as base</p>
                            </DialogTrigger>
                            <DialogContent>
                              <div className="flex flex-col items-center gap-y-3">
                                {user?.accounts?.map((account) => (
                                  <div
                                    key={account.provider}
                                    className="flex items-center gap-x-4"
                                  >
                                    <div>
                                      <Button
                                        onClick={async () => {
                                          const { data } = await axios.get(
                                            `/api/socials/${account.provider}`
                                          );

                                          setAccounts((prev) => [
                                            ...prev,
                                            {
                                              ...data,
                                              provider: account.provider,
                                            },
                                          ]);
                                        }}
                                      >
                                        Fetch account details from{" "}
                                        {account.provider}
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {accounts.map((account, i) => {
                                return (
                                  <Button
                                    onClick={async () => {
                                      if (account.provider === "facebook") {
                                        console.log(account, "account");
                                        await axios.post(
                                          `/api/socials/${account.provider}`,
                                          {
                                            page_id: account.data[0].id,
                                            page_access_token:
                                              account.data[0].access_token,
                                            message: msg.parts,
                                          }
                                        );
                                      }
                                    }}
                                    key={i}
                                  >
                                    Post to {account.provider}
                                  </Button>
                                );
                              })}
                            </DialogContent>
                          </Dialog>
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
