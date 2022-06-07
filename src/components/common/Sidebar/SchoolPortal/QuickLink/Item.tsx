import classNames from "classnames";
import React from "react";
import { motion, TargetAndTransition } from "framer-motion";
import { QuickLinkType } from ".";

const hoverAnimation: TargetAndTransition = {
  scale: 1.05,
};

const QuickLinkItem = ({ background, name, targetUrl, icon }: QuickLinkType) => {
  return (
    <a href={targetUrl} target="_blank" rel="noreferrer">
      <motion.li
        whileHover={hoverAnimation}
        className={classNames(
          "flex flex-col h-full items-center justify-center rounded-md p-4 border border-solid border-gray-200 cursor-pointer shadow transition-colors",
          background === "WHITE" && "bg-white hover:bg-gray-300/30",
          background === "PURPLE" && "bg-kau-primary/70 hover:bg-kau-primary/90",
          background === "GRAY" && "bg-sky-100"
        )}
      >
        {icon}
        <p
          className={classNames(
            "pt-4 font-bold text-gray-600",
            background === "WHITE" && "text-gray-600",
            background === "PURPLE" && "text-white",
            background === "GRAY" && "text-gray-700"
          )}
        >
          {name}
        </p>
      </motion.li>
    </a>
  );
};

export default QuickLinkItem;
