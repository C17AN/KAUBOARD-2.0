import React from "react";
import Modal from "../common/Modal";

type PhotoDetailModalProps = {
  imageUrl: string;
  handleClose: () => void;
};

const PhotoDetailModal = ({ imageUrl, handleClose }: PhotoDetailModalProps) => {
  return (
    <Modal handleClose={handleClose}>
      <div className="inline-block">
        <img src={imageUrl} className="inline-block max-w-[60vw] max-h-[80vh]" alt="이미지" />
      </div>
    </Modal>
  );
};

export default PhotoDetailModal;
