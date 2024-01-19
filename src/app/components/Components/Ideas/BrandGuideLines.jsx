import React from "react";
import { Switch } from "../../utilUI/ui/switch";

const BrandGuideLines = () => {
  return (
    <div>
      <h1 className="text-center my-6 text-xl font-bold">
        Ensure the GuideLines
      </h1>
      <div className="grid gap-x-3 grid-cols-3 items-center justify-items-center gap-y-8">
        <div className="flex items-center gap-3">
          <Switch />
          <label htmlFor="" className="font-semibold text-base">
            Fact check
          </label>
        </div>
        <div className="flex items-center gap-3">
          <Switch />
          <label htmlFor="" className="font-semibold text-base">
            Platform guidelines
          </label>
        </div>
        <div className="flex items-center gap-3">
          <Switch />
          <label htmlFor="" className="font-semibold text-base">
            Brand Guidelines
          </label>
        </div>
        <div className="flex items-center gap-3">
          <Switch />
          <label htmlFor="" className="font-semibold text-base">
            Brand Guidelines
          </label>
        </div>
        <div className="flex items-center gap-3">
          <Switch />
          <label htmlFor="" className="font-semibold text-base">
            Brand Guidelines
          </label>
        </div>
      </div>
    </div>
  );
};

export default BrandGuideLines;
