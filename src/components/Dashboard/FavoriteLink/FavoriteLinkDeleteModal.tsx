import React from "react";
import Modal from "../../common/Modal";
import { FavoriteLink } from "./List";

type FavoriteLinkDeleteModalProps = {
  handleClose: () => void;
  title: string;
};

const FavoriteLinkDeleteModal = ({ handleClose, title }: FavoriteLinkDeleteModalProps) => {
  return (
    <Modal>
      <div className="bg-white rounded-lg">
        <h2>즐겨찾기를 삭제하시겠습니까?</h2>
      </div>
    </Modal>
  );
};

export default FavoriteLinkDeleteModal;
