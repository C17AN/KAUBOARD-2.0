import React, { useEffect, useState } from "react";
import NotificationItem from "./Item";

const Notice = () => {
  useEffect(() => {
    fetch("https://calm-mesa-43659.herokuapp.com/notification")
      .then((res) => res.json())
      .then((data) => {
        setGeneralNotiList(data.generalNotiList.slice(0, 4));
        setSchoolNotiList(data.schoolNotiList.slice(0, 4));
        setIsLoading(false);
      });
  }, []);

  const [generalNotiList, setGeneralNotiList] = useState([]);
  const [schoolNotiList, setSchoolNotiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isNewItem = (item) => {
    if (
      (new Date(item.date).getDate() === new Date().getDate() ||
        new Date(item.date).getDate() === new Date().getDate() - 1) &&
      new Date(item.date).getMonth() === new Date().getMonth()
    ) {
      return "new";
    } else {
      return "old";
    }
  };

  return (
    <div className="flex gap-8 bg-white py-4 px-6 rounded-md border-[1px] border-gray-200 border-solid shadow-sm">
      <nav className="mb-2 flex-1">
        <div className="mb-2">
          <span className="mr-1 text-lg font-bold">일반공지</span>
          <span className="text-sm text-gray-500">General Notice</span>
        </div>
        <ul className="flex flex-col gap-2">
          {isLoading
            ? "로딩 중..."
            : generalNotiList.map((item, idx) => (
                <NotificationItem key={idx} noticeType="GENERAL" title={item} />
              ))}
        </ul>
      </nav>
      <nav className="flex-1">
        <div className="mb-2">
          <span className="mr-1 text-lg font-bold">학사공지</span>
          <span className="text-sm text-gray-500">Academic Notice</span>
        </div>
        <ul className="flex flex-col gap-2">
          {isLoading
            ? "로딩 중..."
            : schoolNotiList.map((item, idx) => (
                <NotificationItem key={idx} noticeType="SCHOOL" title={item} />
              ))}
        </ul>
      </nav>
    </div>
  );
};

export default Notice;
