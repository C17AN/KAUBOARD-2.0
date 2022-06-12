import classNames from "classnames";
import React from "react";

type SwitchProps = {
  handleClick: () => void;
  isSelected: boolean;
};

const Switch = ({ isSelected, handleClick }: SwitchProps) => {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <div className="relative">
        <input type="checkbox" id="toggleTwo" className="sr-only" onClick={handleClick} />
        <div
          className={classNames(
            "block bg-[#E5E7EB] w-14 h-8 rounded-full",
            isSelected && "bg-emerald-300"
          )}
        ></div>
        <div
          className={classNames(
            "dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition",
            isSelected && "translate-x-6"
          )}
        ></div>
      </div>
    </label>
  );
};

export default Switch;
