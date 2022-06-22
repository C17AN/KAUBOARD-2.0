import React, { useEffect, useState } from "react";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import CancelButton from "../../common/Button/CancelButton";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Modal from "../../common/Modal";
import { v4 as uuidv4 } from "uuid";
import { Memo } from "./List";
import TextArea from "../../common/TextArea";
import isEmpty from "../../../utils/helpers/isEmpty";

type MemoUploadModalProps = {
  handleClose: () => void;
  setMemoList: (memoList: Memo[]) => void;
  selectedMemo?: Memo;
};

const MAX_CONTENT_LENGTH = 1500;

const MemoUploadModal = ({ handleClose, setMemoList, selectedMemo }: MemoUploadModalProps) => {
  const { title: presetMemoTitle, content: presetMemoContent } = selectedMemo ?? {
    title: "",
    content: "",
  };

  const [getItem, setItem] = useLocalStorageAsync();
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

  const handleSubmit = async () => {
    if (!presetMemoTitle) {
      await createMemo();
    } else {
      await modifyMemo();
    }
    handleClose();
  };

  const createMemo = async () => {
    const newMemo = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toLocaleString(),
    };
    try {
      const _memoList = (await getItem("memos")) ?? [];
      const memoList = isEmpty(_memoList) ? [] : [..._memoList];
      setItem("memos", [newMemo, ...memoList]);
      setMemoList([newMemo, ...memoList]);
    } catch (err) {
      setItem("memos", []);
      setMemoList([]);
    }
  };

  const modifyMemo = async () => {
    const newMemo = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date().toLocaleString(),
    };
    try {
      const _memoList: Memo[] = (await getItem("memos")) ?? [];
      const filteredMemoList = _memoList?.filter((memo) => {
        const { id } = memo;
        return id !== selectedMemo?.id;
      });
      setItem("memos", [newMemo, ...filteredMemoList]);
      setMemoList([newMemo, ...filteredMemoList]);
    } catch (err) {
      setItem("memos", []);
      setMemoList([]);
    }
  };

  return (
    <Modal>
      <div className="flex flex-col bg-white pl-6 pr-4 py-4 w-[30rem] h-[36rem] rounded-lg">
        <h2 className="text-2xl font-bold text-gray-600 mb-2">
          {presetMemoTitle ? "메모 수정" : "메모 추가"}
        </h2>
        {!presetMemoTitle && (
          <ul className="text-gray-400 space-y-1 text-xs border-b border-solid border-gray-200 pb-2 mr-2">
            <li>발표 대본, 간단한 메모 등을 이곳에 남겨 보세요.</li>
            <li>메모 및 일정은 서버로 전송되지 않고, 브라우저에만 안전하게 저장됩니다.</li>
          </ul>
        )}
        <div className="flex flex-col flex-1">
          <input
            value={title}
            type="text"
            placeholder="제목 (최대 25자)"
            maxLength={25}
            spellCheck={false}
            className="focus:outline-none focus:bg-gray-50 transition-colors rounded-md text-lg caret-slate-500 py-2 pl-3 my-2 placeholder-slate-400/80 text-slate-500 font-semibold"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            value={content}
            placeholder="메모할 내용을 입력하세요"
            onChange={(e) => setContent(e.target.value)}
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
