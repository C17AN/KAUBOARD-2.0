import React, { useEffect, useState } from "react";
import { DocumentTextIcon, PencilAltIcon } from "@heroicons/react/outline";
import MemoUploadModal from "./MemoUploadModal";
import useLocalStorage from "../../../hooks/useLocalStorage";
import MemoItem from "./Item";
import styled from "@emotion/styled";

export type Memo = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

const MAX_MEMO_COUNT = 10;

const MemoList = () => {
  const [isMemoUploadModalOpen, setIsMemoUploadModalOpen] = useState(false);
  const [isMemoDetailModalOpen, setIsMemoDetailModalOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [getItem, setItem] = useLocalStorage();

  useEffect(() => {
    const _memoList = getItem("memos") || [];
    setMemoList(_memoList);
  }, []);

  return (
    <>
      <div className="flex items-center mb-4 text-gray-600">
        <DocumentTextIcon className="w-5 h-5 mr-2" />
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-[6px]">메모장</span>
        </h2>
      </div>
      <div className="flex flex-col bg-white/90 h-full border border-solid border-gray-200 rounded-lg p-4 shadow">
        {memoList.length > 0 ? (
          <StyledMemoList className="flex flex-col flex-1 overflow-y-auto gap-4 mb-4 pr-2 ">
            {memoList?.map((memo) => {
              const { id, title, content, createdAt } = memo;
              return (
                <MemoItem
                  key={id}
                  id={id}
                  title={title}
                  content={content}
                  setMemoList={setMemoList}
                  createdAt={createdAt}
                  handleClick={() => {
                    setSelectedMemo(memo);
                    console.log(memo);
                    setIsMemoDetailModalOpen(true);
                  }}
                />
              );
            })}
          </StyledMemoList>
        ) : (
          <div className="flex-1 flex justify-center items-center text-gray-400 font-semibold text-xl">
            메모가 없습니다.
          </div>
        )}
        <div className="self-end font-semibold">
          <span className="text-base text-gray-500/80 mr-3">
            ({`${memoList?.length} / ${MAX_MEMO_COUNT}`})
          </span>
          <button
            className="p-1 w-12 h-12 inline-block rounded-full text-white bg-kau-primary/60 hover:bg-kau-primary/80 transition-colors"
            onClick={() => {
              setIsMemoUploadModalOpen(true);
            }}
          >
            <PencilAltIcon className="inline-block w-6 h-6 font-bold" />
            {/* <span className="text-lg font-semibold py-2 px-4">새 메모 추가하기</span> */}
          </button>
        </div>
      </div>
      {isMemoUploadModalOpen && (
        <MemoUploadModal
          setMemoList={setMemoList}
          handleClose={() => {
            setIsMemoUploadModalOpen(false);
          }}
        />
      )}
      {isMemoDetailModalOpen && (
        <MemoUploadModal
          setMemoList={setMemoList}
          presetMemoTitle={selectedMemo?.title}
          presetMemoContent={selectedMemo?.content}
          handleClose={() => {
            setIsMemoDetailModalOpen(false);
          }}
        />
      )}
    </>
  );
};

const StyledMemoList = styled.ul``;

export default MemoList;
