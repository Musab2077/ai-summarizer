import React from "react";

const AfterChoosingFile = ({ text }) => {
  // console.log(text)
  return (
    <div className="place-content-center">
        <textarea
          className="text-black w-full outline-none border border-gray-400 rounded-sm py-2 px-3 font-light text-sm"
          defaultValue={text}
          style={{ height: "340px" }}
        ></textarea>
    </div>
  );
};

export default AfterChoosingFile;
