import { SpeakerphoneIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import getNotification from "../../../apis/notification";
import NotificationItem from "./Item";

const Notice = () => {
  // 쿼리 사용 이유 : 대시보드 -> 다른 페이지 -> 대시보드 처럼 페이지를 이동할 때, 매번 데이터를 새로 불러오지 않도록
  const { data, dataUpdatedAt, isLoading } = useQuery("notification", getNotification, {
    // onSuccess: ({ data }: { data: { generalNotiList: string[]; schoolNotiList: string[] } }) => {
    // onSuccess는 실제 쿼리를 수행했을 때에만 실행되므로, 여기에 setState 로직을 사용하면 안된다.
    // },
    // cacheTime: 2 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  useEffect(() => {
    setGeneralNotiList(data?.data?.generalNotiList ?? []);
    setSchoolNotiList(data?.data?.schoolNotiList ?? []);
  }, [isLoading]);

  const [generalNotiList, setGeneralNotiList] = useState<string[]>([]);
  const [schoolNotiList, setSchoolNotiList] = useState<string[]>([]);

  return (
    <>
      <div className="flex justify-between items-end my-4">
        <div className="flex space-x-2 items-center">
          <SpeakerphoneIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold">공지사항</h2>
        </div>
        <div className="text-xs text-gray-600 font-light">
          최근 업데이트 : {new Date(dataUpdatedAt).toLocaleTimeString()}
        </div>
      </div>
      <main className="flex mb-2 space-x-8 bg-white/80 backdrop-blur-sm py-4 px-6 rounded-md border-[1px] border-gray-200 border-solid shadow-sm">
        <section className="flex-1">
          <div className="mb-2 pb-2 border-b-[1px] border-slate-200 border-solid">
            <span className="mr-1 text-lg font-bold text-gray-700">일반공지</span>
            <span className="text-sm text-gray-500">General Notice</span>
          </div>
          <ul className="flex flex-col gap-1">
            {isLoading
              ? "로딩 중..."
              : generalNotiList.map((item, idx) => (
                  <NotificationItem key={idx} noticeType="GENERAL" title={item} />
                ))}
          </ul>
        </section>
        <section className="flex-1">
          <div className="mb-2 pb-2 border-b-[1px] border-slate-200 border-solid">
            <span className="mr-1 text-lg font-bold text-gray-700">학사공지</span>
            <span className="text-sm text-gray-500">Academic Notice</span>
          </div>
          <ul className="w-full flex flex-col gap-1 overflow-hidden">
            {isLoading
              ? "로딩 중..."
              : schoolNotiList.map((item, idx) => (
                  <NotificationItem key={idx} noticeType="SCHOOL" title={item} />
                ))}
          </ul>
        </section>
      </main>
    </>
  );
};

export default Notice;
