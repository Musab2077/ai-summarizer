import React from "react";
import Steps from "./Steps";

const BeforeSummarization = () => {
  return (
    <div className="place-content-center place-items-center">
      <div className="space-y-2">
        <Steps stepsNum={"01."} stepDetail={"Upload your document (.txt, .docx or .pdf file) less than 700Kb on the left-hand side"} />
        <Steps stepsNum={"02."} stepDetail={"Click the AI Summarize button and enjoy"} arrowRes={false} />
        {/* <Steps stepsNum={"03."} stepDetail={""} arrowRes={false} /> */}
      </div>
    </div>
  );
};

export default BeforeSummarization;
