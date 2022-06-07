import classNames from "classnames";
import React from "react";

type CancelButtonProps = {
  handleClick: () => void;
  text?: string;
  size?: "SMALL" | "MEDIUM";
};

const CancelButton = ({ handleClick, text = "취소", size = "MEDIUM" }: CancelButtonProps) => {
  return (
    <button
      className={classNames(
        "bg-red-400 hover:bg-red-500 py-2 px-4 rounded-lg text-gray-50 font-semibold transition-colors",
        size === "SMALL" && "text-sm py-1 px-3"
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default CancelButton;
