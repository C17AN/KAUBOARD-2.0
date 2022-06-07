import React from "react";
import classNames from "classnames";

type ConfirmButtonProps = {
  handleClick: () => void;
  text?: string;
  disabled?: boolean;
  size?: "SMALL" | "MEDIUM";
};

const ConfirmButton = ({
  handleClick,
  disabled = false,
  text = "확인",
  size = "MEDIUM",
}: ConfirmButtonProps) => {
  return (
    <button
      className={classNames(
        "bg-emerald-400 hover:bg-emerald-500 py-2 px-4 rounded-lg text-gray-50 font-semibold transition-colors disabled:bg-gray-400/80 disabled:cursor-not-allowed",
        size === "SMALL" && "text-sm py-1 px-3"
      )}
      disabled={disabled}
      onClick={() => {
        !disabled && handleClick();
      }}
    >
      {text}
    </button>
  );
};

export default ConfirmButton;
