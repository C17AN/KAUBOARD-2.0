import { LinkIcon } from "@heroicons/react/outline";
import React from "react";

type QuickLinkFloatingButtonProps = {
  handleClick: () => void;
};

const QuickLinkFloatingButton = ({ handleClick }: QuickLinkFloatingButtonProps) => {
  return (
    <button
      className="fixed bottom-8 right-8 w-14 h-w-14 p-3 bg-kau-primary/80 rounded-full shadow hover:bg-kau-primary transition-all"
      onClick={handleClick}
    >
      <LinkIcon className="text-white" />
    </button>
  );
};

export default QuickLinkFloatingButton;
