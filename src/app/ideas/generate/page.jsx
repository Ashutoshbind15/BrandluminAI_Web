"use client";

import React, { useState } from "react";
import RichtextEditor from "../../components/Components/Ideas/RichtextEditor";
import Stepper from "../../components/UI/Navigation/Stepper";
import MediaGlobe from "../../components/Components/Ideas/MediaGlobe";
import TagSelector from "../../components/Components/Ideas/TagSelector";
import MoodSelector from "../../components/Components/Ideas/MoodSelector";
import AgeRangeSlider from "../../components/Components/Ideas/AgeSelector";
import { CloudOutlined, SmileFilled, SmileOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import AnimatedButton from "../../components/UI/Buttons/AnimatedButton";
import { Button } from "../../components/utilUI/ui/button";
import MediaLimit from "../../components/Components/Ideas/MediaLimit";
import BrandGuideLines from "../../components/Components/Ideas/BrandGuideLines";
import UploaderButton from "../../components/Components/UploaderButton";
import { useAtom } from "jotai";
import {
  editorAtom,
  ideaCurrentStepAtom,
  ideaMediaAtom,
  ideaMoodAtom,
  ideaTagsAtom,
} from "../../utils/stateStore/ideaAtoms";
import { convertToRaw } from "draft-js";
import axios from "axios";
import { toast } from "@/app/components/utilUI/ui/use-toast";

const ageIcons = [
  { age: 65, icon: <SmileFilled /> },
  { age: 30, icon: <SmileOutlined /> },
  // Add more icons as needed
];

const MapWithNoSSR = dynamic(
  () => import("../../components/Components/Ideas/GlobalMap"),
  { ssr: false }
);

const parseEditorContent = (editorState) => {
  const rawContent = convertToRaw(editorState.getCurrentContent());
  let parsedContent = "";

  rawContent.blocks.forEach((block) => {
    switch (block.type) {
      case "unstyled":
        parsedContent += block.text + "\n";
        break;
      case "unordered-list-item":
      case "ordered-list-item":
        parsedContent += `• ${block.text}\n`; // Replace with numbers for ordered list if needed
        break;
      case "code-block":
        parsedContent += `Code block string '${block.text}'\n`;
        break;
      case "atomic":
        const entityKey = block.entityRanges[0]?.key;
        const entity = rawContent.entityMap[entityKey];
        if (entity && entity.type === "IMAGE") {
          const { src } = entity.data;
          parsedContent += `Image url: '${src}'\n`;
        }
        break;
      default:
        parsedContent += block.text + "\n";
        break;
    }

    // Handling inline styles (like strong)
    if (block.inlineStyleRanges.length > 0) {
      block.inlineStyleRanges.forEach((styleRange) => {
        if (styleRange.style === "BOLD") {
          const start = styleRange.offset;
          const end = start + styleRange.length;
          const boldText = block.text.slice(start, end);
          parsedContent = parsedContent.replace(
            boldText,
            `Emphasized point: ${boldText}`
          );
        }
      });
    }
  });

  return parsedContent;
};

const ideaStepComponent = ({ step }) => {
  switch (step) {
    case 1:
      return <RichtextEditor />;
    case 2:
      return (
        <div className="py-6 grid gap-y-5">
          <MediaGlobe />
          <TagSelector />
          <MoodSelector />
        </div>
      );
    case 3:
      return (
        <div className="w-full grid gap-y-8 py-12 grid-cols-2 items-center justify-items-center">
          <p className="font-bold text-center text-xl">
            Select the age range of your target audience
          </p>
          <AgeRangeSlider
            recommendedRange={{ min: 10, max: 30 }}
            ageIcons={ageIcons}
          />

          <div className="">
            <MapWithNoSSR />
          </div>
          <p className="font-bold text-center text-xl">
            Select the target areas of yours
          </p>

          <div className="col-span-2">
            <p className="font-bold text-center text-xl">
              What are the common interests of your audience
            </p>
          </div>

          <div className="col-span-2 grid grid-cols-6 w-full">
            <div></div>
            <div className="col-span-4 grid grid-cols-4 gap-x-2 items-center justify-items-center h-20 gap-y-4">
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
              <AnimatedButton>
                <div className="flex items-center gap-x-2">
                  <SmileFilled />
                  <p>Thriller</p>
                </div>
              </AnimatedButton>
            </div>
            <div></div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="w-full grid gap-y-6">
          <MediaLimit />
          <BrandGuideLines />

          <div className="border-dashed border-gray-600 border-2 py-16 place-items-center grid">
            <CloudOutlined className="text-2xl mb-3" />
            <UploaderButton
              className={
                "ut-button:bg-primary ut-button:ut-uploading:bg-primary ut-label:my-3 ut-label:text-muted"
              }
              endpoint="imageUploader"
              onSuccess={(res) => console.log(res)}
              onError={() => console.log("err or")}
            />
          </div>
        </div>
      );

    default:
      return <div>Step 1</div>;
  }
};

const Editor = () => {
  const [ideaStep] = useAtom(ideaCurrentStepAtom);
  const [editorState] = useAtom(editorAtom);
  const [moods] = useAtom(ideaMoodAtom);
  const [tags] = useAtom(ideaTagsAtom);
  const [media] = useAtom(ideaMediaAtom);

  const ideaSubmissionHandler = async () => {
    console.log("idea submitted");
    console.log("parsedText", parseEditorContent(editorState));
    console.log(moods);
    console.log(tags);
    console.log(media);

    const ideaData = {
      description: parseEditorContent(editorState),
      theme: moods,
      type: tags,
      media,
    };

    console.log(ideaData);

    // Send the data to the server

    const { data } = await axios.post("/api/idea", ideaData);

    console.log(data);
    toast("Idea submitted successfully", "success");
  };

  return (
    <div className="">
      <Stepper steps={[1, 2, 3, 4]} StepComponent={ideaStepComponent} />
      {ideaStep === 3 && (
        <div className="flex justify-center mb-6">
          <Button onClick={ideaSubmissionHandler}>Submit</Button>
        </div>
      )}
    </div>
  );
};

export default Editor;
