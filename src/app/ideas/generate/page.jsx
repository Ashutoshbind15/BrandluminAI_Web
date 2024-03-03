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
import { Slider } from "../../components/utilUI/ui/slider/SingleSlider";
import MediaLimit from "../../components/Components/Ideas/MediaLimit";
import BrandGuideLines from "../../components/Components/Ideas/BrandGuideLines";
import UploaderButton from "../../components/Components/UploaderButton";
import { useAtom } from "jotai";
import {
  ideaCurrentStepAtom,
  ideaParsedTextAtom,
} from "../../utils/stateStore/ideaAtoms";

const ageIcons = [
  { age: 65, icon: <SmileFilled /> },
  { age: 30, icon: <SmileOutlined /> },
  // Add more icons as needed
];

const MapWithNoSSR = dynamic(
  () => import("../../components/Components/Ideas/GlobalMap"),
  { ssr: false }
);

const ideaStepComponent = ({ step }) => {
  const [currSliderValues, setCurrSliderValues] = useState([20]);

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
  const [parsedText] = useAtom(ideaParsedTextAtom);

  const ideaSubmissionHandler = () => {
    console.log("idea submitted");
    console.log(parsedText);
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
