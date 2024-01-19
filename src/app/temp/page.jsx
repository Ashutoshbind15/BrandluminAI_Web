"use client";

import React, { useState } from "react";
import RichtextEditor from "../components/Components/Ideas/RichtextEditor";
import Stepper from "../components/UI/Navigation/Stepper";
import MediaGlobe from "../components/Components/Ideas/MediaGlobe";
import TagSelector from "../components/Components/Ideas/TagSelector";
import MoodSelector from "../components/Components/Ideas/MoodSelector";
import AgeRangeSlider from "../components/Components/Ideas/AgeSelector";
import {
  CloudFilled,
  CloudOutlined,
  FileFilled,
  SmileFilled,
  SmileOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import AnimatedButton from "../components/UI/Buttons/AnimatedButton";
import { Button } from "../components/utilUI/ui/button";
import { Slider } from "../components/utilUI/ui/slider/SingleSlider";
import MediaLimit from "../components/Components/Ideas/MediaLimit";
import BrandGuideLines from "../components/Components/Ideas/BrandGuideLines";
import UploaderButton from "../components/Components/UploaderButton";

const ageIcons = [
  { age: 65, icon: <SmileFilled /> },
  { age: 30, icon: <SmileOutlined /> },
  // Add more icons as needed
];

const MapWithNoSSR = dynamic(
  () => import("../components/Components/Ideas/GlobalMap"),
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
  return (
    <>
      {/* <div className="flex flex-col items-center w-full px-3">
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
      </div> */}

      <Stepper steps={[1, 2, 3, 4]} StepComponent={ideaStepComponent} />
    </>
  );
};

export default Editor;
