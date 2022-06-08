import React, { useEffect, useState } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import CancelButton from "../../common/Button/CancelButton";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Modal from "../../common/Modal";
import { v4 as uuidv4 } from "uuid";
import { Memo } from "./List";

type MemoUploadModalProps = {
  handleClose: () => void;
  setMemoList: (memoList: Memo[]) => void;
  presetMemoTitle?: string;
  presetMemoContent?: string;
};

const MAX_CONTENT_LENGTH = 1500;

const MemoUploadModal = ({
  handleClose,
  setMemoList,
  presetMemoTitle = "",
  presetMemoContent = "",
}: MemoUploadModalProps) => {
  const [getItem, setItem] = useLocalStorage();
  const [title, setTitle] = useState<string>(presetMemoTitle);
  const [content, setContent] = useState<string>(presetMemoContent);
  const [memo, setMemo] = useState<Memo>({
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toLocaleString(),
  });

  useEffect(() => {
    setMemo({ ...memo, title, content, createdAt: new Date().toLocaleString() });
  }, [title, content]);

  const handleSubmit = () => {
    const newMemo = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toLocaleString(),
    };

    const memoList = getItem("memos") ?? [];
    if (!presetMemoTitle) {
      setItem("memos", [newMemo, ...memoList]);
      setMemoList([newMemo, ...memoList]);
    } else {
      setItem("memos", [newMemo, ...memoList]);
      setMemoList([newMemo, ...memoList]);
    }
    handleClose();
  };

  return (
    <Modal>
      <div className="flex flex-col bg-white pl-6 pr-4 py-4 w-[30rem] h-[30rem] rounded-lg">
        <h2 className="text-2xl font-bold text-gray-600">
          {presetMemoTitle ? "메모 수정" : "메모 추가"}
        </h2>
        <div className="flex flex-col flex-1">
          <input
            value={title}
            type="text"
            placeholder="제목"
            spellCheck={false}
            className="focus:outline-none focus:bg-gray-50 transition-colors rounded-md text-lg caret-slate-500 py-2 pl-3 my-2 placeholder-slate-400/80 text-slate-500 font-semibold"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            value={content}
            placeholder="메모할 내용을 입력하세요"
            className="resize-none placeholder:text-lg flex-1 mb-4 pr-6 transition-colors focus:bg-gray-50 border-gray-100 rounded-lg py-4 pl-3 focus:outline-none text-lg caret-slate-500 placeholder-slate-400/80 text-slate-500 font-semibold"
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            maxLength={MAX_CONTENT_LENGTH}
          />
        </div>
        <p className="font-semibold text-base text-gray-500/90 text-right mb-5 -mt-2">
          ({content.length || 0} / {MAX_CONTENT_LENGTH})
        </p>
        <div className="space-x-6 text-right">
          <CancelButton text="취소" handleClick={handleClose} />
          <ConfirmButton text="확인" handleClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default MemoUploadModal;
