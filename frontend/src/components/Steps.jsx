import { BsArrowDown } from "react-icons/bs";

const Steps = ({ stepsNum, stepDetail, arrowRes = true }) => {
  return (
    <div>
      <div className="space-x-4 flex">
        <ol className="h-8 w-8 text-center place-content-center text-sm font-semibold text-white rounded-full bg-blue-600">
          {stepsNum}
        </ol>
        <ol className="w-48 lg:w-56 text-sm">{stepDetail}</ol>
      </div>
      {arrowRes && (
        <div className="ml-2">
          <BsArrowDown className="size-5" />
        </div>
      )}
    </div>
  );
};

export default Steps;
