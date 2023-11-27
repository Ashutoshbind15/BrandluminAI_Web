"use client";

import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import IdeaList from "../components/Components/Ideas/IdeaList";
import { useEffect } from "react";
import axios from "axios";
import { ideatypes } from "../models/Idea";

const IdeasPage = () => {
  const markdown = `
  # Hello world!
  Check the EditorComponent.tsx file for the code .
  `;

  const [ideas, setIdeas] = useState([]);
  const [selectedIdeaCategory, setSelectedIdeaCategory] = useState("All");

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
          <div className="w-1/5 border-2 border-black rounded-l-lg flex flex-col justify-end items-center">
            <div> Hello</div>
          </div>
          <div className="w-4/5  flex items-center justify-center">
            <MDEditor
              value={value}
              onChange={setValue}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </div>
        <div className="w-2/5 bg-orange-50 flex items-center">
          <div className="w-4/5">
            {ideas && (
              <IdeaList
                ideas={ideas.filter(
                  (idea) => idea.type === selectedIdeaCategory
                )}
              />
            )}
          </div>
          <div className="flex-1 flex flex-col">
            {ideatypes.map((type) => (
              <div onClick={() => setSelectedIdeaCategory(type)}>{type}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeasPage;
