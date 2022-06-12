import { TrashIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";
import FavoriteLinkDeleteModal from "./FavoriteLinkDeleteModal";
import { FavoriteLink } from "./List";

const FavoriteLinkItem = ({ title, targetUrl, thumbnail }: FavoriteLink) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isFavoriteLinkDeleteModalOpen, setIsFavoriteLinkDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        className="flex flex-col items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors overflow-hidden whitespace-nowrap text-ellipsis"
        href={targetUrl}
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={"/icons/homepage.png"}
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
        <div>
          <TrashIcon className="w-4 h-4" />
        </div>
      </a>
      {isFavoriteLinkDeleteModalOpen && (
        <FavoriteLinkDeleteModal handleClose={() => {}} title={title} />
      )}
    </>
  );
};

export default FavoriteLinkItem;
