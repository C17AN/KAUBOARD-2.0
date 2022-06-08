import { ExclamationCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import React, { Dispatch, SetStateAction } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import CancelButton from "../../common/Button/CancelButton";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Modal from "../../common/Modal";
import { Memo } from "./List";

type MemoDeleteModalProps = {
  selectedMemoId: string;
  onClose: () => void;
  setMemoList: Dispatch<SetStateAction<Memo[]>>;
};

const MemoDeleteModal = ({ selectedMemoId, onClose, setMemoList }: MemoDeleteModalProps) => {
  const [getItems, setItems] = useLocalStorage();

  const deleteMemo = (selectedMemoId) => {
    const _memoList = getItems("memos");
    const filteredMemoList = _memoList.filter((memo) => {
      const { id } = memo;
      return id !== selectedMemoId;
    });
    setMemoList(filteredMemoList);
    setItems("memos", filteredMemoList);
    onClose();
  };

  return (
    <Modal>
      <div className="flex flex-col bg-white rounded-lg w-[20rem] p-4">
        <section className="flex items-center mb-6">
          <ExclamationIcon className="w-8 h-8 mr-4 text-red-500" />
          <div>
            <h2 className="text-gray-600 font-bold text-lg">메모를 삭제하시겠습니까?</h2>
            <span className="inline-block text-xs text-gray-500">
              삭제한 메모는 복구할 수 없습니다.
            </span>
          </div>
        </section>
        <div className="mt-auto text-right space-x-4">
          <CancelButton text="취소" handleClick={onClose} />
          <ConfirmButton text="확인" handleClick={() => deleteMemo(selectedMemoId)} />
        </div>
      </div>
    </Modal>
  );
};

export default MemoDeleteModal;
