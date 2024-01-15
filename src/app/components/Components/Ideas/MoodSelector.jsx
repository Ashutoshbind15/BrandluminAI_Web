import React from "react";
import AnimatedButton from "../../UI/Buttons/AnimatedButton";
import { SmileFilled, SmileOutlined, SmileTwoTone } from "@ant-design/icons";

const MoodSelector = () => {
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
                <SmileFilled />
                <div>Happy and cheerful</div>
              </div>
            </AnimatedButton>
          </div>
          <div className={"grid items-center justify-items-center"}>
            <AnimatedButton>
              <div className="flex items-center gap-2">
                <SmileTwoTone />
                <div>Science and Facts</div>
              </div>
            </AnimatedButton>
          </div>
          <div className={"grid items-center justify-items-center"}>
            <AnimatedButton>
              <div className="flex items-center gap-2">
                <SmileOutlined />
                <div>Creative and Funny</div>
              </div>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;
