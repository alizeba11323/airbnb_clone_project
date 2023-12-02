import React from "react";
interface HeadingProps {
  title: string;
  subString?: string;
  center?: boolean;
}
const Heading: React.FC<HeadingProps> = ({ title, subString, center }) => {
  return (
    <div
      className={` text-2xl font-semibold ${
        center ? "text-center" : "text-start"
      }
      
      `}
    >
      {title}
    </div>
  );
};
export default Heading;
