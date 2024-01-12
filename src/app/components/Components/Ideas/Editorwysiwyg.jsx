"use client";

import React, { useState } from "react";

const Editor = () => {
  const [stuff, setStuff] = useState([]);
  const [cline, setCline] = useState("");
  const [selectedType, setSelectedType] = useState("");

  return (
    <div>
      <div className="toolbar">
        {/* Add more buttons for different elements as needed */}
      </div>

      <div
        contentEditable={true}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setStuff((p) => [...p, <p className="">{cline}</p>]);
            setCline("");
          }
        }}
        onInput={(e) => {
          setCline(e.target.innerText);
        }}
      ></div>

      <div className="my-6 border-1 border-black">
        {stuff.map((el, idx) => {
          console.log(el);
          return <div key={idx}>{el}</div>;
        })}
      </div>
    </div>
  );
};

export default Editor;
