import React from "react";
import ReactMarkdown from "react-markdown";

const AfterSummarization = ({ text, isLoading }) => {
  return (
    <div className="h-full pt-3">
      <div className="h-64 overflow-y-auto bg-gray-50 p-3 rounded-md">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Generating summary...</span>
          </div>
        ) : (
          <p className="text-gray-700">
            <ReactMarkdown>{text}</ReactMarkdown>
          </p>
        )}
      </div>
    </div>
  );
};

export default AfterSummarization;
