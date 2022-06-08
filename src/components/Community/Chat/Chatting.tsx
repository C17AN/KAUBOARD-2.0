import React, { ChangeEvent, useEffect, useState } from "react";
import {
  push,
  ref,
  limitToLast,
  onValue,
  orderByChild,
  query,
  remove,
  get,
} from "@firebase/database";
import MessageType from "../../../types/Message";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { realtimeDbService } from "../../../firebase/Config";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../../../recoil/atom/authentication";
import ChattingRestrictionModal from "./ChattingRestrictionModal";

type ChattingProps = {
  channelType: string;
};

const Chatting = ({ channelType }: ChattingProps) => {
  const location = ref(realtimeDbService, `chatting`);
  const [isChattingRestrictionModal, setIsChattingRestrictionModal] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useRecoilState<boolean>(isAuthenticatedAtom);

  useEffect(() => {
    // 데이터베이스 subscribe 코드
    onValue(chatRef, (res) => {
      const _messageList = Object.values(res.val()) as MessageType[];
      setMessageList(_messageList);
    });
    return () => {};
  }, []);

  const chatRef = query(
    ref(realtimeDbService, `chatting`),
    orderByChild("createdAt"),
    limitToLast(100)
  );
  const [message, setMessage] = useState<null | string>(null);
  const [messageList, setMessageList] = useState<null | MessageType[]>(null);

  const sendMessage = () => {
    push(location, {
      uid: uuidv4(),
      name: "찬민",
      message,
      createdAt: new Date().toLocaleString(),
    });
    // receiveMessage();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col bg-white/80 rounded-lg shadow p-8 h-full border border-gray-200 border-solid">
        {messageList !== null && (
          <ul className="flex-1 inline-flex flex-col gap-5 overflow-y-scroll mb-8">
            {messageList?.map((message) => (
              <Message key={message.uid} {...message} />
            ))}
          </ul>
        )}
        <div className="mt-auto flex items-center space-x-4">
          <input
            type="text"
            placeholder="텍스트를 입력하세요"
            className="bg-slate-100 flex-1 rounded-lg py-2 px-4 text-sm text-gray-500 focus:outline-none focus:bg-gray-200 transition-colors placeholder:text-gray-400"
            onChange={handleInputChange}
            autoCorrect={"off"}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="button"
            className="flex items-center justify-center bg-kau-primary bg-opacity-70 hover:bg-opacity-100 transition-all p-2 text-white rounded-full"
            onClick={sendMessage}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      {!isAuthenticated && isChattingRestrictionModal && (
        <ChattingRestrictionModal
          handleClose={() => {
            setIsChattingRestrictionModal(false);
          }}
        />
      )}
    </>
  );
};

export default Chatting;
