import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode; // Icon can be any React node
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
}) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center w-64">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default FeatureCard;
