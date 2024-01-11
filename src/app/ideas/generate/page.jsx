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
  CloseOutlined,
  CloseSquareFilled,
  CloseSquareOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  WechatFilled,
  YoutubeOutlined,
} from "@ant-design/icons";
import NewTeam from "@/app/components/Client/Form/NewTeam";
import Editor from "@/app/components/Components/Ideas/Editor";
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
        className="bg-white p-8 center flex flex-col"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
      >
        <CloseSquareFilled
          className="self-end my-3 text-2xl"
          onClick={() => setIsModalOpen(false)}
        />

        <div className="w-full">
          <NewTeam />
        </div>
      </Modal>

      <div className="flex justify-around items-center px-12 w-full py-6">
        <div className="flex flex-col items-center w-3/5 px-12 pt-8">
          <div className="w-full flex flex-col">
            <div className="border-t-1 border-black border-x-1 py-2 px-2 flex items-center gap-2">
              {openPosts.length ? (
                openPosts.map((post, index) => {
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
                })
              ) : (
                <p>Select ideas to start editing</p>
              )}
            </div>

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
                          key={index}
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
                            key={index}
                          />
                        );
                      })}
                      <button onClick={() => setIsModalOpen(true)}>Edit</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-4/5 flex flex-col items-center border-b-1 border-r-1 border-t-1 py-4 border-black">
                <Editor />
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5 self-stretch flex flex-col justify-around">
          <div className="w-full flex items-center shadow-2xl">
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
    </div>
  );
};

export default IdeasPage;
