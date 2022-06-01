import React from "react";

type NotificationItemProps = {
  noticeType: "GENERAL" | "SCHOOL";
  title: string;
};

const NotificationItem = ({ noticeType, title }: NotificationItemProps) => {
  return (
    <li className="hover:bg-slate-100 hover:text-black hover:font-semibold text-slate-700 p-4 rounded-lg transition-all">
      {noticeType === "GENERAL" ? (
        <a href={"https://www.kau.ac.kr/web/pages/gc32172b.do"}>{title}</a>
      ) : (
        <a href={"https://www.kau.ac.kr/web/pages/gc14561b.do"}>{title}</a>
      )}
    </li>
  );
};

export default NotificationItem;
