import React, { useEffect, useRef, useState } from "react";

import MessageType from "../../../types/Message";
import Message from "./Message";
import { v4 as uuidv4 } from "uuid";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom, userEmailAtom } from "../../../recoil/atom/authentication";
import ChattingRestrictionModal from "./ChattingRestrictionModal";
import { deleteMessage, listenMessageUpdate, postMessage } from "../../../apis/chatting";
import { userNameAtom } from "../../../recoil/atom/application";

type ChattingProps = {
  channelType: string;
};

const Chatting = ({ channelType }: ChattingProps) => {
  const [isChattingRestrictionModal, setIsChattingRestrictionModal] = useState(true);
  const [isAuthenticated] = useRecoilState<boolean>(isAuthenticatedAtom);
  const [userEmail] = useRecoilState(userEmailAtom);
  const [userName] = useRecoilState(userNameAtom);
  const [content, setContent] = useState<null | string>(null);
  const [message, setMessage] = useState<Omit<MessageType, "createdAt" | "uid"> | null>(null);
  const [messageList, setMessageList] = useState<null | MessageType[]>(null);
  const chattingRef = useRef<any>();

  useEffect(() => {
    deleteMessage();
    return listenMessageUpdate(setMessageList);
  }, []);

  useEffect(() => {
    const newMessage = {
      content,
      senderEmail: userEmail,
      senderName: userName,
      type: "MESSAGE",
    };
    setMessage(newMessage as any);
  }, [content]);

  useEffect(() => {
    if (messageList) {
      scrollToBottom();
    }
  }, [messageList]);

  const scrollToBottom = () => {
    if (chattingRef !== null) {
      chattingRef.current.scrollTop = chattingRef.current.scrollHeight;
    }
  };

  return (
    <>
      <div className="flex flex-col flex-1 bg-white/80 rounded-lg shadow p-6 h-full border border-gray-200 border-solid overflow-hidden">
        {messageList !== null && (
          <ul
            ref={chattingRef}
            className="flex-1 inline-flex flex-col gap-5 overflow-y-scroll mb-8"
          >
            {messageList?.map((message) => {
              return <Message key={message.uid} {...message} />;
            })}
          </ul>
        )}
        <div className="mt-auto flex items-center space-x-4">
          <input
            type="text"
            value={content ?? ""}
            placeholder="텍스트를 입력하세요"
            className="bg-slate-100 flex-1 rounded-lg py-2 px-4 text-sm text-gray-500 focus:outline-none focus:bg-gray-200 transition-colors placeholder:text-gray-400"
            onChange={(e) => setContent(e.target.value)}
            autoCorrect={"off"}
            autoComplete="off"
            spellCheck={false}
            maxLength={75}
            onKeyUp={(e) => {
              if (e.key === "Enter" && message !== null) {
                postMessage(message);
                setContent(null);
              }
            }}
          />
          <button
            type="button"
            className="flex items-center justify-center bg-kau-primary bg-opacity-70 hover:bg-opacity-100 transition-all p-2 text-white rounded-full"
            onClick={() => {
              if (message !== null) {
                postMessage(message);
                setContent(null);
              }
            }}
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
