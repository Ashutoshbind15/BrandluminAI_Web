"use client";

import { useState } from "react";
import { Slider } from "../../utilUI/ui/slider/SingleSlider";

const MediaLimit = () => {
  const [twitterValue, setTwitterValue] = useState([15]);

  return (
    <div className="w-full grid grid-cols-2 justify-items-center items-center gap-y-6">
      <div className="w-3/4 flex items-center flex-col">
        <p className="text-md mb-4 font-medium">
          Enter the expected length for twitter
        </p>
        <Slider
          value={twitterValue}
          onValueChange={(e) => setTwitterValue(e)}
        />
      </div>
      <div className="w-3/4 flex items-center flex-col">
        <p className="text-md mb-4 font-medium">
          Enter the expected length for twitter
        </p>
        <Slider
          value={twitterValue}
          onValueChange={(e) => setTwitterValue(e)}
        />
      </div>
      <div className="w-3/4 flex items-center flex-col">
        <p className="text-md mb-4 font-medium">
          Enter the expected length for twitter
        </p>
        <Slider
          value={twitterValue}
          onValueChange={(e) => setTwitterValue(e)}
        />
      </div>
      <div className="w-3/4 flex items-center flex-col">
        <p className="text-md mb-4 font-medium">
          Enter the expected length for twitter
        </p>
        <Slider
          value={twitterValue}
          onValueChange={(e) => setTwitterValue(e)}
        />
      </div>
      <div className="w-3/4 flex items-center flex-col">
        <p className="text-md mb-4 font-medium">
          Enter the expected length for twitter
        </p>
        <Slider
          value={twitterValue}
          onValueChange={(e) => setTwitterValue(e)}
        />
      </div>
    </div>
  );
};

export default MediaLimit;
