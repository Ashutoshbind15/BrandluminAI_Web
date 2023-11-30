"use client";

import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import IdeaList from "../components/Components/Ideas/IdeaList";
import { useEffect } from "react";
import axios from "axios";
import RoundedFace from "../components/UI/Visuals/RoundedFace";
import SideBars from "../components/Layout/SideBars";

const ideatypes = ["video", "blog", "shorts", "podcast", "idea"];

const IdeasPage = () => {
  const markdown = `
  # Hello world!
  Check the EditorComponent.tsx file for the code .
  `;

  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaCategory, setSelectedIdeaCategory] = useState("All");
  const [sidebarState, setSidebarState] = useState("Live");

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
      <div className="flex justify-around items-center px-12 w-full py-6">
        <div className="w-3/5 flex  px-12 py-4">
          <div className="w-1/5 border-1 border-black rounded-l-lg flex">
            <SideBars
              className="flex flex-col justify-end border-r-1 border-black w-1/2 items-center"
              elementStyleString={`my-1 py-2 px-4 hover:underline hover:cursor-pointer w-full text-center decoration-primary`}
              elements={["Live", "All", "Edit"]}
              selectedElementStyleString={`bg-blue-700 text-white`}
              sideBarState={sidebarState}
              setSideBarState={setSidebarState}
            />

            <div className="flex flex-col justify-end w-1/2 items-center">
              <RoundedFace
                txt={"Ash"}
                size={"S"}
                className={"bg-red-400 flex items-center justify-center my-2"}
              />
              <RoundedFace
                txt={"Ash"}
                size={"S"}
                className={"bg-red-400 flex items-center justify-center my-2"}
              />
              <RoundedFace
                txt={"Ash"}
                size={"S"}
                className={"bg-red-400 flex items-center justify-center my-2"}
              />
            </div>
          </div>
          <div className="w-4/5 flex items-center justify-center">
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
          </div>
        </div>
        <div className="w-2/5 flex items-center shadow-2xl">
          <div className="w-4/5">
            {ideas && (
              <IdeaList
                ideas={ideas.filter(
                  (idea) => idea.type === selectedIdeaCategory
                )}
              />
            )}
          </div>
          <div className="flex-1 flex flex-col py-4 ml-6">
            <SideBars
              className="flex flex-col mx-2"
              elementStyleString={`my-1 hover:underline hover:cursor-pointer w-full text-center decoration-primary py-2 px-4`}
              elements={ideatypes}
              selectedElementStyleString={`bg-blue-700 text-white`}
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
