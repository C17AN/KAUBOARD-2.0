import React from "react";

type NotificationItemProps = {
  noticeType: "GENERAL" | "SCHOOL";
  title: string;
};

const NotificationItem = ({ noticeType, title }: NotificationItemProps) => {
  const handleNavigation = (path: string) => {
    window.open(path, "_blank");
  };

  return (
    <li
      className="list-disc list-inside hover:bg-kau-primary/10 leading-5 hover:text-black text-slate-700/80 px-4 py-2 rounded-lg transition-all cursor-pointer hover:border-gray-200 hover:shadow overflow-hidden text-ellipsis whitespace-nowrap"
      onClick={() => {
        if (noticeType === "GENERAL") {
          const path = "https://www.kau.ac.kr/web/pages/gc32172b.do";
          handleNavigation(path);
        } else {
          const path = "https://www.kau.ac.kr/web/pages/gc14561b.do";
          handleNavigation(path);
        }
      }}
    >
      {title}
    </li>
  );
};

export default NotificationItem;
