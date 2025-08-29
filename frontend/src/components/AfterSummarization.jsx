import React from "react";
import ReactMarkdown from "react-markdown";

const AfterSummarization = ({ text }) => {
  return (
    <div className="h-96 flex-1 overflow-y-auto overflow-x-hidden pl-3 pr-6 text-sm">
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};

export default AfterSummarization;
