"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { ideaCurrentStepAtom } from "@/app/utils/stateStore/ideaAtoms";

const DefaultStepComponent = ({ step }) => <div>{`Content for ${step}`}</div>;

const Stepper = ({
  steps = ["Step 1", "Step 2", "Step 3"],
  StepComponent = DefaultStepComponent,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [_, setIdeaStep] = useAtom(ideaCurrentStepAtom);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const nextStep = () => {
    if (!isLastStep) {
      setCurrentStep(currentStep + 1);
      setIdeaStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
      setIdeaStep(currentStep - 1);
    }
  };

  // ... (other parts of the Stepper component)

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="border p-4 w-full min-h-threequarter flex items-center">
        <StepComponent step={steps[currentStep]} />
      </div>

      <div className="flex w-full items-center justify-around px-6 py-4">
        <button
          className={`px-4 py-2 rounded-full border-2 ${
            isFirstStep
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
          onClick={prevStep}
          disabled={isFirstStep}
        >
          ←
        </button>
        <div>
          <div className="flex items-center justify-center">
            {" "}
            {/* Increased bottom margin */}
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                    index <= currentStep
                      ? "bg-black text-white border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setCurrentStep(index);
                    setIdeaStep(index);
                  }}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className="flex items-center w-10">
                    <motion.div
                      className="h-2 bg-gray-300"
                      initial={{ backgroundColor: "#e5e7eb" }} // Tailwind gray-300
                      animate={{
                        backgroundColor:
                          index < currentStep ? "#000000" : "#e5e7eb",
                      }} // Tailwind black and gray-300
                      transition={{ duration: 0.5 }}
                      style={{ width: "100%" }}
                    ></motion.div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <button
          className={`px-4 py-2 rounded-full border-2 ${
            isLastStep
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-black hover:text-white"
          }`}
          onClick={nextStep}
          disabled={isLastStep}
        >
          →
        </button>
      </div>
    </div>
  );

  // ... (rest of the component)
};

export default Stepper;
