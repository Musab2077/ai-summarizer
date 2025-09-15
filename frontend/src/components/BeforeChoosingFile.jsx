import React from "react";
import { PiUploadLight } from "react-icons/pi";

const BeforeChoosingFile = ({ handleFile, isLoading }) => {
  return (
    <div className="px-7 py-5 outline-dotted outline-gray-300 rounded-md place-items-center h-[350px] place-content-center">
      {isLoading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          <span>Processing file...</span>
        </div>
      ) : (
        <>
          <PiUploadLight className="size-10 mx-auto" />
          <p className="text-center">Select your files</p>
          <div className="mt-4 text-center">
            <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md px-2 py-1">
              Choose files(s)
              <input
                type="file"
                className="hidden"
                onChange={handleFile}
                accept=".docx, .pdf, .txt, .doc"
                disabled={isLoading}
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default BeforeChoosingFile;