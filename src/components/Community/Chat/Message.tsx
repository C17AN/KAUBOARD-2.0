import React from "react";
import MessageType from "../../../types/Message";

const Message = ({ name, message, createdAt, type }: MessageType) => {
  return (
    <li>
      <p className="mb-1 text-gray-500 text-sm font-semibold">{name}</p>
      <div className="inline-flex items-center bg-yellow-300 bg-opacity-70 rounded-md py-2 px-3 mb-1">
        <p className="text-gray-700 font-semibold">{message}</p>
      </div>
      <p className="text-gray-500 text-xs font-extralight">신고하기</p>
    </li>
  );
};

export default Message;
