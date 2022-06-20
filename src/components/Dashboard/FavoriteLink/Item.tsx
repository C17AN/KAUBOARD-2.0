import React, { useRef, useState } from "react";
import classNames from "classnames";
import FavoriteLinkDeleteModal from "./FavoriteLinkDeleteModal";
import { TrashIcon } from "@heroicons/react/outline";
import { FavoriteLink } from "./List";

type FavoriteLinkItemProps = {
  setFavoriteLinkList: React.Dispatch<React.SetStateAction<FavoriteLink[]>>;
} & FavoriteLink;

const FavoriteLinkItem = ({
  id,
  title,
  targetUrl,
  thumbnail,
  setFavoriteLinkList,
}: FavoriteLinkItemProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isFavoriteLinkDeleteModalOpen, setIsFavoriteLinkDeleteModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <a
        className="relative flex flex-col items-center justify-center gap-2 p-2 rounded-md hover:bg-gray-100 transition-colors overflow-hidden whitespace-nowrap text-ellipsis"
        href={targetUrl}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
          <TrashIcon
            className={classNames(
              "w-5 h-5 transition-opacity absolute top-2 right-2 text-gray-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            onClick={(e) => {
              e.preventDefault();
              setIsFavoriteLinkDeleteModalOpen(true);
            }}
          />
        </div>
      </a>
      {isFavoriteLinkDeleteModalOpen && (
        <FavoriteLinkDeleteModal
          selectedId={id}
          title={title}
          setFavoriteLinkList={setFavoriteLinkList}
          handleClose={() => {
            setIsFavoriteLinkDeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default FavoriteLinkItem;
