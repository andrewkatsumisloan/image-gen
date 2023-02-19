import React from "react";

const TextCompleteOutput = (props) => {
  return (
    <div className="h-[100%]">
      {/* Text output from server */}
      <textarea
        readOnly
        className="border-2 w-[60%] h-[30%] border-2 border-gray-300 bg-white h-10 px-4 my-[5%] rounded-2xl text-sm focus:outline-none border-gray-300 bg-white px-4 my-[2.5%] rounded-2xl text-sm focus:outline-none"
        value={props.output}
      />
    </div>
  );
};

export default TextCompleteOutput;
