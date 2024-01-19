"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/app/utils";

const DoubleSlider = React.forwardRef(
  ({ className, value, iconPositions = [30, 50, 80], ...props }, ref) => (
    <>
      <div className="w-full flex items-center relative mb-3">
        {iconPositions.map((position, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${position}%`,
              display:
                position >= value[0] && position <= value[1] ? "block" : "none",
            }}
          >
            {index}
          </div>
        ))}
      </div>
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
        value={value}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </>
  )
);
DoubleSlider.displayName = SliderPrimitive.Root.displayName;

export { DoubleSlider };
