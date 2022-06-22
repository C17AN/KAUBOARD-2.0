import React from "react";
import formatRelativeDate from "../../utils/helpers/formatRelativeDate";
import Modal from "../common/Modal";

type PhotoDetailModalProps = {
  photoUrl: string;
  uploaderName: string;
  handleClose: () => void;
  createdAt?: Date;
  description?: string;
};

const PhotoDetailModal = ({
  uploaderName,
  description,
  photoUrl,
  createdAt,
  handleClose,
}: PhotoDetailModalProps) => {
  return (
    <Modal handleClose={handleClose}>
      <div className="inline-block bg-white rounded-lg p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-700">{uploaderName}의 사진</h2>
        <div className="w-full text-center mb-4">
          <img
            src={photoUrl}
            className="inline-block max-w-[30vw] max-h-[50vh]rounded-lg px-2"
            alt="이미지"
          />
        </div>
        <section className="flex flex-col justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-base text-gray-700 font-semibold mb-1">{uploaderName}</div>
            <span className="text-gray-400 text-xs font-light">
              {formatRelativeDate(new Date(createdAt!))}
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-5">
            {description || "이미지 설명이 없습니다."}
          </p>
        </section>
      </div>
    </Modal>
  );
};

export default PhotoDetailModal;
