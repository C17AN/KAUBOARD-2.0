import React, { useRef } from "react";
import { FavoriteLink } from "./List";

const FavoriteLinkItem = ({ title, targetUrl, thumbnail }: FavoriteLink) => {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <a
      className="flex flex-col items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors overflow-hidden whitespace-nowrap text-ellipsis"
      href={targetUrl}
      target="_blank"
      rel="noreferrer"
    >
      <img
        src={thumbnail}
        ref={imageRef}
        className="rounded-lg w-9 h-9"
        onError={() => {
          imageRef!.current!.src = "/icons/homepage.png";
        }}
        alt={title}
      />
      <p className="text-gray-700 w-[80%] text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
        {title}
      </p>
    </a>
  );
};

export default FavoriteLinkItem;
