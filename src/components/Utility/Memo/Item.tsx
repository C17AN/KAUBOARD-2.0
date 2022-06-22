import React, { Dispatch, SetStateAction, useState } from "react";
import MemoDeleteModal from "./MemoDeleteModal";
import styled from "@emotion/styled";
import { XIcon } from "@heroicons/react/outline";
import { Memo } from "./List";

type MemoItemProps = {
  handleClick: () => void;
  setMemoList: Dispatch<SetStateAction<Memo[]>>;
} & Memo;

const MemoItem = ({ handleClick, setMemoList, id, title, content, createdAt }: MemoItemProps) => {
  const [isMemoDeleteModalOpen, setIsMemoDeleteModalOpen] = useState(false);

  return (
    <>
      <li
        className="bg-gray-100/80 rounded-md px-4 py-3 cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={handleClick}
      >
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-700 text-lg mb-1">{title}</h3>
          <XIcon
            className="w-6 h-6 text-red-400 font-bold"
            onClick={(e) => {
              e.stopPropagation();
              setIsMemoDeleteModalOpen(true);
            }}
          />
        </div>
        <div className="my-2 text-sm font-semibold text-gray-500">
          <Content>{content}</Content>
        </div>
        <span className="text-xs text-gray-600">최근 수정일 : {createdAt}</span>
      </li>
      {isMemoDeleteModalOpen && (
        <MemoDeleteModal
          selectedMemoId={id}
          setMemoList={setMemoList}
          handleClose={() => {
            setIsMemoDeleteModalOpen(false);
          }}
        />
      )}
    </>
  );
};

const Content = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default MemoItem;
