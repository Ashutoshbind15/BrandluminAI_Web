"use client";

import { SearchOutlined, TagOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import AnimatedButton from "../../UI/Buttons/AnimatedButton";

const Tag = ({ text = "tag" }) => {
  return (
    <div className="flex items-center justify-center bg-black text-white rounded-lg cursor-pointer hover:scale-105 active:scale-95 transition-all px-4 py-1 mr-2">
      <TagOutlined />
      <div className="ml-3">{text}</div>
    </div>
  );
};

const TagSelector = () => {
  const [tags, setTags] = useState([]);
  const [ctag, setCtag] = useState("");

  return (
    <div className="px-4 grid grid-cols-2 gap-x-8 items-center">
      <div>
        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Add Your custom tags"
            className="flex-1 outline-none border-b-2 border-black mr-3 py-2 px-4"
            value={ctag}
            onChange={(e) => setCtag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setTags((p) => [...p, ctag]);
                setCtag("");
              }
            }}
          />
          <PrimaryButton className={"pb-3"}>
            <SearchOutlined />
          </PrimaryButton>
        </div>

        <div className="my-6 grid grid-cols-4 gap-y-4">
          {tags.map((tag) => (
            <Tag text={tag} />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-4 text-xl font-bold">Select from the popular tags</p>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          <AnimatedButton>
            <div className="flex items-center justify-around gap-2">
              <TagOutlined />
              <div>Tag 1</div>
            </div>
          </AnimatedButton>
          <AnimatedButton>
            <div className="flex items-center justify-around gap-2">
              <TagOutlined />
              <div>Tag 1</div>
            </div>
          </AnimatedButton>
          <AnimatedButton>
            <div className="flex items-center justify-around gap-2">
              <TagOutlined />
              <div>Tag 1</div>
            </div>
          </AnimatedButton>
          <AnimatedButton>
            <div className="flex items-center justify-around gap-2">
              <TagOutlined />
              <div>Tag 1</div>
            </div>
          </AnimatedButton>
          <AnimatedButton>
            <div className="flex items-center justify-around gap-2">
              <TagOutlined />
              <div>Tag 1</div>
            </div>
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default TagSelector;
