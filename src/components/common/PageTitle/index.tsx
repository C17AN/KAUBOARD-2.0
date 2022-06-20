import React from "react";
import DarkModeButton from "../../Dashboard/DarkModeButton";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title = "기본 제목입니다." }: PageTitleProps) => {
  return (
    <header className="mb-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl text-gray-700 mb-4">{title}</h2>
        {/* TODO: 다크 모드 기능 추가 */}
        {/* <DarkModeButton /> */}
      </div>
      <div className="bg-kau-primary h-[2px] rounded-2xl bg-opacity-40" />
    </header>
  );
};

export default PageTitle;
