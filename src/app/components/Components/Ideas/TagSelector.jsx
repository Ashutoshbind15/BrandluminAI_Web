"use client";

import { SearchOutlined, TagOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import AnimatedButton from "../../UI/Buttons/AnimatedButton";
import { useAtom } from "jotai";
import { ideaTagsAtom } from "@/app/utils/stateStore/ideaAtoms";

const popularTags = ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"];

const Tag = ({ text = "tag", isSet, toggleTag }) => {
  return (
    <AnimatedButton selected={isSet} onClick={() => toggleTag(text)}>
      <div className="flex items-center justify-around gap-2">
        <TagOutlined />
        <div>{text}</div>
      </div>
    </AnimatedButton>
  );
};

const TagSelector = () => {
  const [tags, setTags] = useAtom(ideaTagsAtom);
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

        {/* <div className="my-6 grid grid-cols-4 gap-y-4">
          {tags.map((tag) => (
            <Tag text={tag} />
          ))}
        </div> */}
      </div>
      <div>
        <p className="mb-4 text-xl font-bold">Select from the popular tags</p>
        <div className="grid grid-cols-3 gap-y-4 gap-x-2">
          {popularTags.map((tag) => (
            <Tag
              text={tag}
              isSet={tags.includes(tag) ? true : false}
              key={tag}
              toggleTag={() =>
                setTags((p) =>
                  p.includes(tag) ? p.filter((i) => i !== tag) : [...p, tag]
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagSelector;
