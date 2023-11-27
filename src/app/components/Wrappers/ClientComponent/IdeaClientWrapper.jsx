"use client";

import React from "react";
import { useState } from "react";

const IdeaClientWrapper = () => {
  const markdown = `
    # Hello world!
    Check the EditorComponent.tsx file for the code .
    `;

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
        <div className="w-2/5 bg-orange-50">
          <IdeaList ideas={[{ text: "Idea1" }, { text: "Idea2" }]} />
          <IdeaList ideas={[{ text: "Idea1" }, { text: "Idea2" }]} />
        </div>
      </div>
    </div>
  );
};

export default IdeaClientWrapper;
