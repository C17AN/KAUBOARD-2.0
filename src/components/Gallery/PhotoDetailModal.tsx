import React from "react";
import Modal from "../common/Modal";

type PhotoDetailModalProps = {
  imageUrl: string;
  handleClose: () => void;
};

const PhotoDetailModal = ({ imageUrl, handleClose }: PhotoDetailModalProps) => {
  return (
    <Modal handleClose={handleClose}>
      <div className="w-[60vw] inline-block">
        <img src={imageUrl} className="inline-block" alt="이미지" />
      </div>
    </Modal>
  );
};

export default PhotoDetailModal;
