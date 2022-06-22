import React, { useState } from "react";
import NavItem from "./NavItem";
import {
  CameraIcon,
  ChatAltIcon,
  DesktopComputerIcon,
  PresentationChartBarIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import Weather from "./Weather";
import BugReport from "./BugReport/BugReport";
import SchoolPortal from "./SchoolPortal";
import { useRecoilState } from "recoil";
import { sidebarIndexAtom } from "../../../recoil/atom/application";

const FIRST_NAV_ITEM = 0;

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useRecoilState(sidebarIndexAtom);

  return (
    <aside className="flex flex-col w-64 border-r-[1px] border-r-slate-300 border-solid px-8 pt-6 pb-8 dark:bg-black">
      <Weather />
      <div className="my-4 mx-[-4px] border-t-[2px] border-kau-primary border-opacity-40 border-solid" />
      <ul className="flex flex-col gap-4 flex-1">
        {navItemList.map((navItem, index) => {
          const { text, icon, targetUrl } = navItem;
          return (
            <NavItem
              key={text}
              text={text}
              icon={icon}
              targetUrl={targetUrl}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}
      </ul>
      <div className="space-y-4">
        <SchoolPortal />
        <BugReport />
      </div>
    </aside>
  );
};

const navItemList = [
  {
    text: "대시보드",
    icon: <TemplateIcon className="w-5 h-5" />,
    targetUrl: "/",
  },
  {
    text: "유틸리티",
    icon: <DesktopComputerIcon className="w-5 h-5" />,
    targetUrl: "/info",
  },
  {
    text: "갤러리",
    icon: <CameraIcon className="w-5 h-5" />,
    targetUrl: "/gallery",
  },
  {
    text: "커뮤니티",
    icon: <ChatAltIcon className="w-5 h-5" />,
    targetUrl: "/community",
  },
  {
    text: "설정",
    icon: <PresentationChartBarIcon className="w-5 h-5" />,
    targetUrl: "/setting",
  },
];

export default Sidebar;
