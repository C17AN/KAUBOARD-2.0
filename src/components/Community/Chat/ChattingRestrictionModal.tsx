import { LockClosedIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sidebarIndexAtom } from "../../../recoil/atom/application";
import { SETTING_INDEX } from "../../../utils/contants/navigationIndex";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Modal from "../../common/Modal";

type ChattingRestrictionModalProps = {
  handleClose: () => void;
};

const ChattingRestrictionModal = ({ handleClose }: ChattingRestrictionModalProps) => {
  const navigate = useNavigate();
  const [, setSelectedIndex] = useRecoilState(sidebarIndexAtom);

  const handleNavigate = () => {
    navigate("/setting", { replace: true });
    setSelectedIndex(SETTING_INDEX);
    handleClose();
  };

  return (
    <Modal>
      <div className="flex flex-col bg-white rounded-lg w-[32rem] p-4">
        <div className="flex items-center mb-6">
          <LockClosedIcon className="text-gray-500 w-8 h-8 mr-4" />
          <div>
            <h2 className="text-lg font-semibold text-gray-700">로그인이 필요합니다.</h2>
            <p className="text-gray-600leading-5 text-xs">
              보다 깔끔한 채팅 환경을 위해, 인증되지 않은 유저는 채팅 기능을 활용하실 수 없습니다.
            </p>
          </div>
        </div>
        <ConfirmButton text="확인" handleClick={handleNavigate} />
      </div>
    </Modal>
  );
};

export default ChattingRestrictionModal;
