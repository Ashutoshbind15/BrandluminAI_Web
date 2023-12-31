"use client";

import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import IdeaList from "../../components/Components/Ideas/IdeaList";
import { useEffect } from "react";
import axios from "axios";
import RoundedFace from "../../components/UI/Visuals/RoundedFace";
import SideBars from "../../components/Layout/SideBars";
import Modal from "react-modal";
import TopBars from "@/app/components/Layout/TopBars";
import PrimaryButton from "@/app/components/UI/Buttons/PrimaryButton";
import {
  CloseSquareOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  WechatFilled,
  YoutubeOutlined,
} from "@ant-design/icons";
const ideatypes = ["video", "blog", "shorts", "podcast", "idea"];
Modal.setAppElement("#wrapper");

const IdeasPage = () => {
  const markdown = `
  # Hello world!
  Check the EditorComponent.tsx file for the code .
  `;

  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaCategory, setSelectedIdeaCategory] = useState("All");
  const [sidebarState, setSidebarState] = useState("Live");
  const [dummyFaces, setDummyFaces] = useState(["Ash", "Ash", "Ash"]);
  const [editorState, setEditorState] = useState("Post");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPosts, setOpenPosts] = useState([]);

  const [socialState, setSocialState] = useState("Instagram");

  console.log(openPosts);

  useEffect(() => {
    const helper = async () => {
      const { data } = await axios.get("/api/idea");
      setIdeas(data);
    };

    helper();
  }, []);

  const [value, setValue] = useState(markdown);
  return (
    <div>
      <Modal
        className="h-72 w-72 bg-red-300 center"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
      >
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>

      <div className="flex justify-around items-center px-12 w-full py-6">
        <div className="flex flex-col items-center w-3/5 px-12 pt-8">
          <div className="w-full flex flex-col">
            <div className="border-t-1 border-black border-x-1 py-2 px-2 flex items-center gap-2">
              {openPosts.map((post, index) => {
                return (
                  <div
                    key={index}
                    className="py-2 flex items-center justify-around bg-black text-white px-4"
                  >
                    <div className="w-1/2 mr-4">{post.title}</div>
                    <CloseSquareOutlined
                      onClick={() =>
                        setOpenPosts(
                          openPosts.filter((p) => p._id !== post._id)
                        )
                      }
                      className="w-1/2"
                    />
                  </div>
                );
              })}
            </div>

            <TopBars
              state={socialState}
              setState={setSocialState}
              listItems={[
                "All",
                "Instagram",
                "Facebook",
                "Twitter",
                "LinkedIn",
                "Youtube",
              ]}
              keyedItems={[
                {
                  key: "All",
                  element: (
                    <div className="flex items-center">
                      <span className="ml-2">All</span>
                    </div>
                  ),
                },
                {
                  key: "Instagram",
                  element: (
                    <div className="flex items-center">
                      <InstagramOutlined />
                      <span className="ml-2">Instagram</span>
                    </div>
                  ),
                },
                {
                  key: "Facebook",
                  element: (
                    <div className="flex items-center">
                      <FacebookOutlined />
                      <span className="ml-2">Facebook</span>
                    </div>
                  ),
                },
                {
                  key: "Twitter",
                  element: (
                    <div className="flex items-center">
                      <TwitterOutlined />
                      <span className="ml-2">Twitter</span>
                    </div>
                  ),
                },
                {
                  key: "LinkedIn",
                  element: (
                    <div className="flex items-center">
                      <LinkedinOutlined />
                      <span className="ml-2">LinkedIn</span>
                    </div>
                  ),
                },
                {
                  key: "Youtube",
                  element: (
                    <div className="flex items-center">
                      <YoutubeOutlined />
                      <span className="ml-2">Youtube</span>
                    </div>
                  ),
                },
              ]}
              selectedItemStyles="bg-white text-black"
              parentStyles={"pt-2 pb-4 pl-2 border-x-1 border-black"}
            />
            <div className="flex w-full">
              <div className="w-1/5 border-1 border-black flex">
                <SideBars
                  className="flex flex-col justify-end border-r-1 border-black w-1/2 items-center"
                  elementStyleString={`my-1 py-2 px-4 hover:underline hover:cursor-pointer w-full text-center decoration-black`}
                  elements={["Live", "All", "Edit"]}
                  selectedElementStyleString={`bg-black text-white`}
                  sideBarState={sidebarState}
                  setSideBarState={setSidebarState}
                />

                <div className="flex flex-col justify-end w-1/2 items-center">
                  {sidebarState !== "Edit" ? (
                    dummyFaces.map((face, index) => {
                      return (
                        <RoundedFace
                          txt={face}
                          size={"S"}
                          className={
                            "bg-black text-white flex items-center justify-center my-2"
                          }
                        />
                      );
                    })
                  ) : (
                    <div className="pb-2">
                      {dummyFaces.map((face, index) => {
                        return (
                          <RoundedFace
                            txt={face}
                            size={"S"}
                            className={
                              "bg-black text-white flex items-center justify-center my-2"
                            }
                          />
                        );
                      })}
                      <button onClick={() => setIsModalOpen(true)}>Edit</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-4/5 flex flex-col items-center border-b-1 border-r-1 border-t-1 py-4 border-black">
                <TopBars
                  listItems={["Post", "Preview"]}
                  state={editorState}
                  setState={setEditorState}
                  selectedItemStyles={
                    "bg-white text-black decoration-black underline"
                  }
                  parentStyles="px-6 w-full flex justify-around items-center mb-4"
                />
                <MDEditor
                  value={value}
                  onChange={setValue}
                  style={{
                    whiteSpace: "pre-wrap",
                    minHeight: "500px",
                    width: "100%",
                  }}
                  onResize={(height) => {
                    console.log(height);
                    return height;
                  }}
                />
                <div className="mt-6 w-full flex items-center justify-between px-4">
                  <div className="flex flex-col">
                    <PrimaryButton className="my-2">Post</PrimaryButton>
                    <PrimaryButton className="my-2 flex items-center">
                      <div className="px-3">Assistance</div>
                      <WechatFilled />
                    </PrimaryButton>
                  </div>
                  <select className="bg-black text-white px-6 py-1">
                    <option value="video">Video</option>
                    <option value="blog">Blog</option>
                    <option value="shorts">Shorts</option>
                    <option value="podcast">Podcast</option>
                    <option value="idea">Idea</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 flex items-center shadow-2xl">
          <div className="w-4/5">
            {ideas && (
              <IdeaList
                ideas={ideas.filter(
                  (idea) => idea.type === selectedIdeaCategory
                )}
                addPost={(post) => setOpenPosts([...openPosts, post])}
              />
            )}
          </div>
          <div className="flex-1 flex flex-col py-4 ml-6">
            <SideBars
              className="flex flex-col mx-2"
              elementStyleString={`my-1 hover:underline hover:cursor-pointer w-full text-center decoration-black py-2 px-4`}
              elements={ideatypes}
              selectedElementStyleString={`bg-black text-white`}
              sideBarState={selectedIdeaCategory}
              setSideBarState={setSelectedIdeaCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;
