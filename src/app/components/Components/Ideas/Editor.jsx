"use client";

import React, { useState } from "react";
import {
  BoldOutlined,
  CodeOutlined,
  FileImageFilled,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import SideBars from "../../Layout/SideBars";
import TopBars from "../../Layout/TopBars";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [mood, setMood] = useState("");
  const [audience, setAudience] = useState("");
  const [selected, setSelected] = useState("title");
  const [editorTopbarState, setEditorTopbarState] = useState("bold");
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="flex flex-col items-center w-full px-3">
        <TopBars
          state={editorTopbarState}
          setState={setEditorTopbarState}
          keyedItems={[
            {
              key: "Bold",
              element: <BoldOutlined />,
            },
            {
              key: "Italic",
              element: <ItalicOutlined />,
            },
            {
              key: "Ordered List",
              element: <OrderedListOutlined />,
            },
            {
              key: "Unordered List",
              element: <UnorderedListOutlined />,
            },
            {
              key: "Image",
              element: <FileImageFilled />,
            },
            {
              key: "Code",
              element: <CodeOutlined />,
            },
          ]}
          selectedItemStyles={"bg-white text-black"}
          itemStyles={"my-4"}
          parentStyles={"border-y-1 border-dashed border-black"}
        />
        <div className="flex flex-col items-center border-1 border-black w-full my-3 rounded-xl px-3">
          <div className="flex items-center w-full py-4 border-b-1 border-black">
            <SideBars
              elements={["title", "description", "sections"]}
              sideBarState={selected}
              setSideBarState={setSelected}
              selectedElementStyleString={"bg-black text-white"}
              className={
                "flex flex-col border-r-1 border-black pr-4 self-stretch"
              }
              elementStyleString={"my-2 px-4 py-1"}
            />
            <textarea
              type="text"
              name=""
              id=""
              className="flex-1 self-stretch outline-none resize-none px-2 py-2 h-96"
              placeholder="Enter content here"
            />
          </div>
          <div className="py-4 w-full flex items-center justify-between px-6">
            <PrimaryButton
              className={""}
              onClick={() => setStep((p) => p - 1)}
              disabled={step === 1}
            >
              Back
            </PrimaryButton>
            {step === 3 && <PrimaryButton className={""}>Submit</PrimaryButton>}
            <PrimaryButton
              className={""}
              onClick={() => {
                setStep((p) => p + 1);
              }}
              disabled={step === 3}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
