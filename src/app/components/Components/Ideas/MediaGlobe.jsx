import React from "react";
import InfoCards from "../Dashboard/InfoCards";
import AnimatedButton from "../../UI/Buttons/AnimatedButton";
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  MediumSquareFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";

const MediaGlobe = () => {
  return (
    <div className="py-6">
      <div className="grid grid-cols-4 gap-x-1 items-center">
        <p className="font-bold text-xl pl-4">
          Where do u plan to post this idea?
        </p>
        <div className="col-span-3 grid grid-cols-4  gap-y-4">
          <div className={"grid items-center justify-items-center"}>
            <AnimatedButton>
              <div className="flex items-center gap-2">
                <InstagramFilled />
                <div>Instagram</div>
              </div>
            </AnimatedButton>
          </div>
          <div className={"grid items-center justify-items-center"}>
            <AnimatedButton>
              <div className="flex items-center gap-2">
                <FacebookFilled />
                <div>Facebook Page</div>
              </div>
            </AnimatedButton>
          </div>
          <div className={"grid items-center justify-items-center"}>
            <AnimatedButton>
              <div className="flex items-center gap-2">
                <LinkedinFilled />
                <div>Linkedin</div>
              </div>
            </AnimatedButton>
          </div>
          <div className={"grid items-center justify-items-center"}>
            <AnimatedButton>
              <div className="flex items-center gap-2">
                <MediumSquareFilled />
                <div>Medium</div>
              </div>
            </AnimatedButton>
          </div>
          <div className={"grid items-center justify-items-center"}>
            <AnimatedButton>
              <div className="flex items-center gap-2">
                <TwitterCircleFilled />
                <div>Twitter</div>
              </div>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaGlobe;
