import React from "react";
import { PiUploadLight } from "react-icons/pi";

const BeforeChoosingFile = ({handleFile}) => {
  return (
    <div className="px-7 py-5 outline-dotted outline-gray-300 rounded-md place-items-center h-[350px] place-content-center">
      <PiUploadLight className="size-10" />
      <p className="text-center">Select your files</p>
      <div className="mt-4">
        <label className="cursor-pointer bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold rounded-md px-2 py-1">
          Choose files(s)
          <input
            type="file"
            className="hidden"
            onChange={handleFile}
            accept=".docx, .pdf, .txt, .doc"
          />
        </label>
      </div>
    </div>
  );
};

export default BeforeChoosingFile;
