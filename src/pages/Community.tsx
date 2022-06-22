import React from "react";
import PageTitle from "../components/common/PageTitle";
import Chatting from "../components/Community/Chat/Chatting";

const Community = () => {
  return (
    <div className="flex flex-col h-full">
      <PageTitle title="커뮤니티" />
      <ul className="list-disc list-inside text-gray-400 text-xs mb-5 space-y-1 -mt-1 pl-2">
        <li>채팅 내역은 매일 새벽 4시에 초기화됩니다.</li>
        <li>
          [커뮤니티] 는 베타 중인 기능으로, 이후 업데이트에서 기능이 추가 & 제거될 수 있습니다.
        </li>
      </ul>
      <Chatting channelType="all" />
    </div>
  );
};

export default Community;
