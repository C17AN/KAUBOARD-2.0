import React, { useState } from "react";
import Modal from "../common/Modal";
import PhotoUploadModal from "./PhotoUploadModal";

type Props = {};

const PhotoList = (props: Props) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div>
      <button
        className="bg-slate-300 py-2 px-4 rounded-md text-sm"
        onClick={() => {
          setIsUploadModalOpen(true);
        }}
      >
        새 이미지 업로드
      </button>
      {isUploadModalOpen && (
        <Modal
          onClose={() => {
            setIsUploadModalOpen(false);
          }}
        >
          <PhotoUploadModal />
        </Modal>
      )}
    </div>
  );
};

export default PhotoList;
