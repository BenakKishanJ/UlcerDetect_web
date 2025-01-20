import React from "react";

interface HowItWorksStepProps {
  number: number; // Number for the step
  title: string;
  description: string;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({
  number,
  title,
  description,
}) => (
  <div className="flex flex-col items-center">
    <div className="text-4xl font-bold bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default HowItWorksStep;
