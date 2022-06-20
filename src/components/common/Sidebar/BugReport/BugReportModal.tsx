import React, { useEffect, useState } from "react";
import postSuggestion from "../../../../apis/suggestion";
import CancelButton from "../../Button/CancelButton";
import ConfirmButton from "../../Button/ConfirmButton";
import Input from "../../Input";
import Modal from "../../Modal";
import TextArea from "../../TextArea";

type BugReportModalProps = {
  handleClose: () => void;
};

export type Suggestion = {
  title: string;
  content: string;
  email?: string | null;
};

const BugReportModal = ({ handleClose }: BugReportModalProps) => {
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const submitSuggestion = async () => {
    if (title && content) {
      await postSuggestion({ title, content, email });
    }
    handleClose();
  };

  useEffect(() => {
    if (title && content) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, content]);

  return (
    <Modal>
      <div className="flex flex-col w-[30rem] h-[36rem] bg-white rounded-lg py-4 px-6">
        <h2 className="text-2xl font-bold text-gray-600 mb-2">건의 및 제보</h2>
        <ul className="text-xs text-gray-400 mb-4">
          <li>건의해주신 의견은 최대한 반영해보려 노력하겠습니다. 🙂</li>
        </ul>
        <div className="flex flex-col flex-1 space-y-4 mb-4">
          <div className="space-y-2">
            <label className="text-gray-600 font-semibold text-lg">
              <span className="text-red-400 mr-1 align-middle">*</span>제목
            </label>
            <Input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="제목을 입력해주세요"
            />
          </div>
          <div className="flex flex-col flex-1 space-y-2">
            <label className="text-gray-600 font-semibold text-lg">
              <span className="text-red-400 mr-1 align-middle">*</span>내용
            </label>
            <TextArea
              onChange={(e) => {
                setContent(e.target.value);
              }}
              placeholder="건의내용을 입력해주세요"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-600 font-semibold text-lg">답변을 전달받을 이메일</label>
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="이메일을 입력해주세요"
              type="email"
            />
          </div>
        </div>
        <div className="space-x-6 text-right">
          <CancelButton text="취소" handleClick={handleClose} />
          <ConfirmButton text="제출" handleClick={submitSuggestion} disabled={!isFormValid} />
        </div>
      </div>
    </Modal>
  );
};

export default BugReportModal;
