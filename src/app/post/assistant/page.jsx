"use client";

import InfoCards from "@/app/components/Components/Dashboard/InfoCards";
import IdeaListItemSm from "@/app/components/Components/Ideas/IdeaListItemSm";
import SideBars from "@/app/components/Layout/SideBars";
import TopBars from "@/app/components/Layout/TopBars";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import { Button } from "@/app/components/utilUI/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/utilUI/ui/tabs";
import { useIdeas } from "@/app/utils/hooks/queries";
import {
  FacebookOutlined,
  InstagramOutlined,
  MediumOutlined,
  SendOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { TabsContent } from "@radix-ui/react-tabs";
import axios from "axios";

import React, { useEffect, useState } from "react";

const IdeaSelector = ({ children, selected, toggleIdea }) => {
  return (
    <div
      onClick={toggleIdea}
      className={`w-full h-12 flex items-center justify-between px-4 border-b-1 border-black cursor-pointer ${
        selected ? "bg-white text-black" : "bg-gray-200"
      }`}
    >
      <div>{children}</div>
      <div
        className={`w-4 h-4 border-1 border-black bg-white ${
          selected ? "bg-black" : ""
        }`}
      ></div>
    </div>
  );
};

const PostAssistant = () => {
  const [sideTopBarState, setSideTopBarState] = useState("Iterations");
  const [socialState, setSocialState] = useState("Instagram");
  const { ideas, ideasError, isIdeasError, isIdeasLoading } = useIdeas();
  const [selectedIdea, setSelectedIdea] = useState();
  const [promptText, setPromptText] = useState("");
  const [selectedIdeas, setSelectedIdeas] = useState([]);
  const [messagesState, setMessagesState] = useState([]);

  useEffect(() => {
    if (selectedIdea) {
      const idea = ideas.find((idea) => idea._id === selectedIdea);
      setMessagesState(idea.chat.messages);
    }
  }, [selectedIdea]);

  return (
    <div className="flex items-stretch h-screen">
      <div className="w-1/4 px-10 flex flex-col justify-around">
        {/* <IdeaListItemSm xs={true} /> */}

        {ideas?.map((idea, idx) => (
          <IdeaSelector
            key={idea._id}
            selected={selectedIdeas.includes(idea._id) ? true : false}
            toggleIdea={() => {
              selectedIdeas.includes(idea._id)
                ? setSelectedIdeas(
                    selectedIdeas.filter((id) => id !== idea._id)
                  )
                : setSelectedIdeas([...selectedIdeas, idea._id]);
            }}
          >
            {`Idea ${idx + 1}`}
          </IdeaSelector>
        ))}

        <div className="">
          <TopBars
            state={sideTopBarState}
            setState={setSideTopBarState}
            listItems={["Iterations", "Theme"]}
            parentStyles={"my-6"}
            selectedItemStyles={"bg-white text-black"}
          />

          <div className="w-full flex items-center flex-wrap pl-2">
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
            <PrimaryButton className="w-5/12 mx-1 flex items-center justify-around my-1">
              <div className="">Clickable</div>
              <div className="w-4 h-4 border-1 border-black bg-white"></div>
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className="w-3/4 flex items-stretch">
        <div className="w-3/4 border-x-1 border-black flex flex-col justify-between">
          <Tabs
            className="overflow-y-auto"
            onValueChange={(e) => setSelectedIdea(e)}
          >
            <TabsList>
              {selectedIdeas?.map((idea, idx) => (
                <TabsTrigger key={idea} value={idea}>
                  {`Idea ${idx + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>

            {selectedIdeas?.map((idea, idx) => (
              <TabsContent value={idea} key={idea}>
                {ideas[ideas.findIndex((sbideas) => sbideas._id === idea)]
                  ?.chat ? (
                  <div className="w-full flex flex-col items-center">
                    <div>Chat</div>
                    {messagesState.map((msg) => {
                      return (
                        <div
                          className={`py-4 px-6 w-1/2 my-8 rounded-xl shadow-md ${
                            msg.role === "user" ? "self-end" : "self-start"
                          }`}
                        >
                          <div>{msg?.parts}</div>
                          {msg.role === "model" && (
                            <div className="border-t-1 border-black py-1 mt-2">
                              <InfoCards className={"w-1/3"}>
                                <p className="font-light text-sm">
                                  Use as base
                                </p>
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
                          prompt:
                            ideas[
                              ideas.findIndex((sbideas) => sbideas._id === idea)
                            ].description,
                          ideaId: idea,
                        });

                        const msgs = data.messages;
                        setMessagesState(msgs);

                        console.log(data);
                      }}
                    >
                      Start Chat
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          <div className="h-12 bg-gray-200 flex items-center justify-between px-4">
            <input
              className="flex-1 font-light tracking-wide"
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
                  ideaId: selectedIdea,
                });

                const msgs = data.messages;
                const lastModelMsg = msgs[msgs.length - 1];

                setMessagesState((p) => [...p, lastModelMsg]);
              }}
            />
          </div>
        </div>
        <div className="w-1/4 flex">
          <SideBars
            keyedElements={[
              {
                key: "Instagram",
                element: <InstagramOutlined className="text-xl" />,
              },
              {
                key: "Facebook",
                element: <FacebookOutlined className="text-xl" />,
              },
              {
                key: "YouTube",
                element: <YoutubeOutlined className="text-xl" />,
              },
              {
                key: "Twitter",
                element: <TwitterOutlined className="text-xl" />,
              },
              {
                key: "Medium",
                element: <MediumOutlined className="text-xl" />,
              },
              {
                key: "Send",
                element: <SendOutlined className="text-xl" />,
              },
            ]}
            sideBarState={socialState}
            className={
              "self-stretch flex flex-col gap-2 py-24 px-10 border-r-1 border-black"
            }
            setSideBarState={setSocialState}
          />
        </div>
      </div>
    </div>
  );
};

export default PostAssistant;
