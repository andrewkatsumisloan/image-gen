import React from "react";

const SizeButtonGroup = (props) => {
  return (
    <div className="mb-4">
      <button
        className={
          props.size === "small"
            ? "rounded-md bg-slate-700 text-xl text-slate-100 shadow-lg font-[700] mx-1 px-3"
            : "rounded-md bg-slate-400 text-md text-slate-100 font-[400] mx-1 px-3"
        }
        id="small"
        onClick={props.sizeHandler}
      >
        Small
      </button>
      <button
        className={
          props.size === "medium"
            ? "rounded-md bg-slate-700 text-xl text-slate-100 shadow-lg font-[700] mx-1 px-3"
            : "rounded-md bg-slate-400 text-md text-slate-100 font-[400] mx-1 px-3"
        }
        id="medium"
        onClick={props.sizeHandler}
      >
        Medium
      </button>
      <button
        className={
          props.size === "large"
            ? "rounded-md bg-slate-700 text-xl text-slate-100 shadow-lg font-[700] mx-1 px-3"
            : "rounded-md bg-slate-400 text-md text-slate-100 font-[400] mx-1 px-3"
        }
        id="large"
        onClick={props.sizeHandler}
      >
        Large
      </button>
    </div>
  );
};

export default SizeButtonGroup;
