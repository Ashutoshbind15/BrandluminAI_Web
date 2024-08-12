"use client";

import ImageSelector from "@/app/components/Client/Assets/Images/ImageSelector";
import InfoCards from "@/app/components/Components/Dashboard/InfoCards";
import { Button } from "@/app/components/utilUI/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/utilUI/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/utilUI/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/utilUI/ui/tabs";
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

  const [selectedMedia, setSelectedMedia] = useState(null);

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

  console.log("media", selectedMedia);

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
                        {user?.accounts?.length ? (
                          <InfoCards className={"w-1/3"}>
                            <Dialog>
                              <DialogTrigger>
                                <p className="font-light text-sm">
                                  Use as base
                                </p>
                              </DialogTrigger>
                              <DialogContent>
                                <div className="flex flex-col items-center gap-y-3 border-b-2 border-gray-400 mb-4 pb-3">
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
                                                provider: account.provider,
                                              },
                                            ]);
                                          }}
                                          disabled={accounts.some(
                                            (acc) =>
                                              acc.provider === account.provider
                                          )}
                                        >
                                          Fetch account details from{" "}
                                          {account.provider}
                                        </Button>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {accounts.map((account, i) => {
                                  if (account.provider === "facebook") {
                                    return (
                                      <>
                                        <Tabs
                                          defaultValue="text"
                                          className="w-[400px]"
                                        >
                                          <TabsList>
                                            <TabsTrigger value="text">
                                              Text Post
                                            </TabsTrigger>
                                            <TabsTrigger value="single">
                                              Single Photo Post
                                            </TabsTrigger>
                                          </TabsList>
                                          <TabsContent value="multiple">
                                            multiple photos post
                                          </TabsContent>
                                          <TabsContent value="text">
                                            <Button
                                              onClick={async () => {
                                                await axios.post(
                                                  `/api/socials/${account.provider}`,
                                                  {
                                                    message: msg.parts,
                                                  }
                                                );
                                              }}
                                              key={i}
                                            >
                                              Post to {account.provider}
                                            </Button>
                                          </TabsContent>

                                          <TabsContent value="single">
                                            <Sheet>
                                              <SheetTrigger asChild>
                                                <Button variant="outline">
                                                  Sel from gallery
                                                </Button>
                                              </SheetTrigger>
                                              <SheetContent>
                                                <SheetHeader>
                                                  <SheetTitle>
                                                    Edit profile
                                                  </SheetTitle>
                                                  <SheetDescription>
                                                    Make changes to your profile
                                                    here.
                                                  </SheetDescription>
                                                </SheetHeader>
                                                <div className="grid gap-4 py-4">
                                                  <ImageSelector
                                                    initialImages={[]}
                                                    selected={selectedMedia}
                                                    setSelected={
                                                      setSelectedMedia
                                                    }
                                                    onSelected={(selected) => {
                                                      console.log(
                                                        "selected",
                                                        selected
                                                      );

                                                      setSelectedMedia(
                                                        selected
                                                      );
                                                    }}
                                                  />
                                                </div>
                                                <SheetFooter>
                                                  <SheetClose asChild>
                                                    <Button type="submit">
                                                      Save changes
                                                    </Button>
                                                  </SheetClose>
                                                </SheetFooter>
                                              </SheetContent>
                                            </Sheet>
                                            <Button
                                              onClick={async () => {
                                                await axios.post(
                                                  `/api/socials/${account.provider}/mediapost`,
                                                  {
                                                    message: msg.parts,
                                                    assetUrl: selectedMedia.url,
                                                  }
                                                );
                                              }}
                                            >
                                              Uploader
                                            </Button>
                                          </TabsContent>

                                          <TabsContent value="multiple">
                                            <Button>
                                              Multiple Photo uploader
                                            </Button>
                                          </TabsContent>
                                        </Tabs>
                                      </>
                                    );
                                  }
                                })}
                              </DialogContent>
                            </Dialog>
                          </InfoCards>
                        ) : (
                          <p className="mt-2 bg-black p-2 rounded-lg text-white">
                            Link your social accounts via login page to post!
                          </p>
                        )}
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
