import React, { useEffect, useState } from "react";
import { ClipboardCheckIcon, ViewGridAddIcon } from "@heroicons/react/outline";
import useLocalStorage from "../../../hooks/useLocalStorage";
import FavoriteLinkItem from "./Item";
import FavoriteLinkCreateModal from "./FavoriteLinkCreateModal";
import { v4 as uuidv4 } from "uuid";

export type FavoriteLink = {
  title: string;
  thumbnail: string;
  targetUrl: string;
};

const FavoriteLinkList = () => {
  const [getItem, setItem] = useLocalStorage();
  const [favoriteLinkList, setFavoriteLinkList] = useState<FavoriteLink[]>([]);
  const [isFavoriteLinkCreateModalOpen, setIsFavoriteLinkCreateModalOpen] = useState(false);

  useEffect(() => {
    const _favoriteLinkList = getItem("favorites");
    setFavoriteLinkList(_favoriteLinkList);
  }, []);

  return (
    <div className="flex flex-col h-full">
      <section className="flex items-center space-x-4 my-4">
        <div className="flex space-x-2 items-center text-gray-700">
          <ClipboardCheckIcon className="w-5 h-5" />
          <h2 className="text-xl font-bold">즐겨찾기</h2>
        </div>
        <button
          className="flex items-center py-1 px-2 text-xs text-white hover:text-gray-600 hover:bg-slate-200 bg-kau-primary hover:bg-opacity-70 font-semibold transition-colors rounded-lg"
          onClick={() => setIsFavoriteLinkCreateModalOpen(true)}
        >
          <span>즐겨찾기 추가</span>
        </button>
      </section>
      <div className="flex flex-1 gap-8 bg-white py-4 px-6 rounded-md border-[1px] border-gray-200 border-solid shadow-sm">
        {favoriteLinkList.length > 0 ? (
          <ul className="w-full h-full grid grid-cols-8 gap-4 overflow-hidden">
            {favoriteLinkList?.map((favoriteLink) => {
              return <FavoriteLinkItem key={uuidv4()} {...favoriteLink} />;
            })}
          </ul>
        ) : (
          <div className="flex-1 text-center py-4 font-semibold text-gray-500 text-lg">
            저장된 즐겨찾기가 없습니다.
          </div>
        )}
        {isFavoriteLinkCreateModalOpen && (
          <FavoriteLinkCreateModal
            handleClose={() => {
              setIsFavoriteLinkCreateModalOpen(false);
            }}
            favoriteLinkList={favoriteLinkList}
            setFavoriteLinkList={setFavoriteLinkList}
          />
        )}
      </div>
    </div>
  );
};

export default FavoriteLinkList;
