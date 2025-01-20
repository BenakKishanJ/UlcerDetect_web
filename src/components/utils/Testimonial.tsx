import React from "react";
interface TestimonialProps {
  name: string;
  feedback: string; // Feedback text
}

const Testimonial: React.FC<TestimonialProps> = ({ name, feedback }) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center w-72">
    <p className="italic mb-4">"{feedback}"</p>
    <h4 className="text-lg font-bold">{name}</h4>
  </div>
);

export default Testimonial;
