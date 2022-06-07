import {
  CakeIcon,
  CursorClickIcon,
  GlobeAltIcon,
  PencilIcon,
  PresentationChartBarIcon,
  TruckIcon,
} from "@heroicons/react/outline";
import {
  AcademicCapIcon,
  DesktopComputerIcon,
  HomeIcon,
  IdentificationIcon,
  LibraryIcon,
} from "@heroicons/react/solid";
import React, { ReactNode } from "react";
import QuickLinkItem from "./Item";

export type QuickLinkType = {
  name: string;
  background: "PURPLE" | "WHITE" | "GRAY";
  icon: ReactNode;
  targetUrl: string;
};

const QuickLink = () => {
  return (
    <div className="h-full">
      <ul className="grid grid-cols-3 grid-rows-3 gap-6 bg-white/90 p-4 rounded-lg border border-solid border-gray-200 shadow h-full">
        {QuickLinkList.map((item) => {
          const { background, name, targetUrl, icon } = item;
          return (
            <QuickLinkItem
              key={name}
              name={name}
              background={background}
              targetUrl={targetUrl}
              icon={icon}
            />
          );
        })}
      </ul>
    </div>
  );
};

const QuickLinkList: QuickLinkType[] = [
  {
    name: "종합정보시스템",
    targetUrl: "https://nportal.kau.ac.kr/",
    background: "PURPLE",
    icon: <AcademicCapIcon className="w-16 h-16 text-white" />,
  },
  {
    name: "LMS",
    targetUrl: "https://lms.kau.ac.kr/",
    background: "WHITE",
    icon: <PencilIcon className="w-16 h-16 text-gray-600" />,
  },
  {
    name: "학교 홈페이지",
    targetUrl: "http://www.hangkong.ac.kr/",
    background: "PURPLE",
    icon: <HomeIcon className="w-16 h-16 text-white" />,
  },
  {
    name: "역량관리시스템",
    targetUrl: "https://scm.kau.ac.kr/",
    background: "WHITE",
    icon: <PresentationChartBarIcon className="w-16 h-16 text-gray-600" />,
  },
  {
    name: "일자리센터",
    targetUrl: "https://career.kau.ac.kr/",
    background: "PURPLE",
    icon: <IdentificationIcon className="w-16 h-16 text-white" />,
  },
  {
    name: "수강신청",
    targetUrl: "http://su.kau.ac.kr/",
    background: "WHITE",
    icon: <CursorClickIcon className="w-16 h-16 text-gray-600" />,
  },
  {
    name: "중앙도서관",
    targetUrl: "http://lib.kau.ac.kr/",
    background: "PURPLE",
    icon: <LibraryIcon className="w-16 h-16 text-white" />,
  },
  {
    name: "주간 식단표",
    targetUrl: "https://kau.ac.kr/web/pages/gc13087b.do",
    background: "WHITE",
    icon: <CakeIcon className="w-16 h-16 text-gray-600" />,
  },
  {
    name: "인터넷 증명발급",
    targetUrl: "https://hangkong.certpia.com/",
    background: "PURPLE",
    icon: <DesktopComputerIcon className="w-16 h-16 text-white" />,
  },
];

export default QuickLink;
