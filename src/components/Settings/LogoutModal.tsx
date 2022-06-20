import React from "react";
import CancelButton from "../common/Button/CancelButton";
import ConfirmButton from "../common/Button/ConfirmButton";
import Modal from "../common/Modal";
import { ExclamationIcon } from "@heroicons/react/outline";

type LogoutModalProps = {
  signOut: () => void;
  handleClose: () => void;
};

const LogoutModal = ({ signOut, handleClose }: LogoutModalProps) => {
  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  return (
    <Modal>
      <div className="rounded-lg p-4 bg-white">
        <section className="flex items-center mb-6">
          <ExclamationIcon className="w-8 h-8 mr-4 text-red-500" />
          <div>
            <h2 className="text-gray-600 font-bold text-lg">로그아웃 하시겠습니까?</h2>
            <span className="inline-block text-xs text-gray-500">
              로그아웃 시 갤러리 등록 · 채팅 기능이 제한됩니다.
            </span>
          </div>
        </section>
        <div className="space-x-4 text-right">
          <CancelButton text="취소" handleClick={handleClose} />
          <ConfirmButton text="확인" handleClick={handleSignOut} />
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
