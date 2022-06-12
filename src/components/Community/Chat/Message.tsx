import React from "react";
import MessageType from "../../../types/Message";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/esm/locale";
import { useRecoilState } from "recoil";
import { userEmailAtom } from "../../../recoil/atom/authentication";
import classNames from "classnames";

const locale = {
  ...ko,
};

const formatDate = (date) => {
  let formattedDate = "";
  if (date) {
    formattedDate = formatRelative(date, new Date(), { locale });
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({ senderName, senderEmail, content, createdAt, type }: MessageType) => {
  const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
  const isMyMessage = userEmail === senderEmail;
  const reportMessage = () => {};

  return (
    <li className={classNames(isMyMessage && "ml-auto pr-6")}>
      <div className="flex items-center mb-1">
        <p className="text-gray-500 text-sm font-semibold mr-2">{senderName}</p>
        <p className="text-gray-400 text-xs">{formatDate(new Date(createdAt!))}</p>
      </div>
      <div
        className={classNames(
          "inline-block items-center text-right rounded-md py-2 px-3 mb-1",
          isMyMessage && "bg-yellow-400/70",
          !isMyMessage && "bg-kau-primary/10"
        )}
      >
        <p className="text-gray-700 font-semibold leading-5">{content}</p>
      </div>
      {!isMyMessage && (
        <button className="block text-gray-500 text-xs font-extralight">신고하기</button>
      )}
    </li>
  );
};

export default Message;
