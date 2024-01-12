"use client";

import React, { useState } from "react";
import {
  AliwangwangOutlined,
  BoldOutlined,
  CodeOutlined,
  FileImageFilled,
  GoogleOutlined,
  GooglePlusOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import TopBars from "../components/Layout/TopBars";
import SideBars from "../components/Layout/SideBars";
import PrimaryButton from "../components/UI/Buttons/PrimaryButton";
import EditorVisual from "../components/Components/Ideas/Editorwysiwyg";
import RichtextEditor from "../components/Components/Ideas/RichtextEditor";

const Editor = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState([]);
  const [mood, setMood] = useState("");
  const [audience, setAudience] = useState("");
  const [selected, setSelected] = useState("title");
  const [editorTopbarState, setEditorTopbarState] = useState("Bold");
  const [step, setStep] = useState(1);

  const [paragraphState, setParagraphState] = useState("");
  const [boldTextState, setBoldTextState] = useState("");
  const [italicTextState, setItalicTextState] = useState("");
  const [listState, setListState] = useState("");

  const [visualState, setVisualState] = useState("");

  const editorRef = React.useRef(null);

  const keyedItems = [
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
  ];

  const contentParser = () => {
    const value = editorRef.current.innerText;
    console.log(value);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full px-3">
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

            <div className="flex-1 flex-col px-3">
              <div className="flex items-center justify-between py-2 px-12 border-y-1 border-dashed border-gray-500">
                {keyedItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setEditorTopbarState(item.key)}
                    className={`hover:scale-110 transition-all ${
                      editorTopbarState === item.key
                        ? "bg-black text-white pb-2 px-2 underline decoration-black"
                        : "btm-shadow pb-1"
                    }`}
                  >
                    {item.element}
                  </button>
                ))}
              </div>
              <div
                type="text"
                name=""
                id=""
                className="my-4 outline-none px-2 py-2 h-96 w-full"
                placeholder="Enter content here"
                contentEditable={true}
                ref={editorRef}
              />

              <div className="my-3 border-y-1 border-black py-1 px-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3">Live</div>
                  <div className="flex items-center gap-2">
                    <AliwangwangOutlined />
                    <AliwangwangOutlined />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AliwangwangOutlined />
                  <AliwangwangOutlined />
                  <AliwangwangOutlined />
                </div>
              </div>
            </div>
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

      <RichtextEditor />
    </>
  );
};

export default Editor;
