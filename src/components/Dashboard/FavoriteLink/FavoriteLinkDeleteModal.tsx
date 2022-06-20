import React from "react";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import CancelButton from "../../common/Button/CancelButton";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Modal from "../../common/Modal";
import { ExclamationIcon } from "@heroicons/react/outline";
import { FavoriteLink } from "./List";

type FavoriteLinkDeleteModalProps = {
  handleClose: () => void;
  selectedId: string;
  setFavoriteLinkList: React.Dispatch<React.SetStateAction<FavoriteLink[]>>;
  title: string;
};

const FavoriteLinkDeleteModal = ({
  handleClose,
  selectedId,
  setFavoriteLinkList,
  title,
}: FavoriteLinkDeleteModalProps) => {
  const slicedName = title.length > 10 ? title.slice(10) + "..." : title;
  const [getItem, setItem] = useLocalStorageAsync();

  const deleteFavoriteLink = async () => {
    try {
      const _favoriteLinkList: FavoriteLink[] = (await getItem("favorites")) ?? [];
      const filteredFavoriteLinkList = _favoriteLinkList.filter((favoriteLink) => {
        const { id } = favoriteLink;
        return id !== selectedId;
      });
      setFavoriteLinkList(filteredFavoriteLinkList);
      setItem("favorites", filteredFavoriteLinkList);
    } catch (err) {
      setFavoriteLinkList([]);
      setItem("favorites", []);
    }
    handleClose();
  };

  return (
    <Modal>
      <div className="flex flex-col bg-white rounded-lg p-4">
        <section className="flex items-center mb-6">
          <ExclamationIcon className="w-8 h-8 mr-4 text-red-500" />
          <div>
            <h2 className="font-bold text-lg text-gray-600">
              즐겨찾기 "{slicedName}" 를 삭제하시겠습니까?
            </h2>
            <span className="inline-block text-xs text-gray-500">
              삭제한 즐겨찾기는 복구할 수 없습니다.
            </span>
          </div>
        </section>
        <div className="mt-auto text-right space-x-4">
          <CancelButton text="취소" handleClick={handleClose} />
          <ConfirmButton text="확인" handleClick={() => deleteFavoriteLink()} />
        </div>
      </div>
    </Modal>
  );
};

export default FavoriteLinkDeleteModal;
