import React, { useState } from "react";
import NavItem from "./NavItem";
import {
  CameraIcon,
  ChatAltIcon,
  DesktopComputerIcon,
  TemplateIcon,
} from "@heroicons/react/outline";
import Profile from "./Profile";

type SidebarProps = {};

const FIRST_NAV_ITEM = 0;

const Sidebar = ({}: SidebarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(FIRST_NAV_ITEM);

  return (
    <aside className="flex flex-col w-64 border-r-[1px] border-r-slate-300 border-solid p-8 dark:bg-black">
      <Profile />
      <div className="h-8" />
      <ul className="flex flex-col gap-4 flex-1">
        {NavItemList.map((navItem, index) => {
          const { text, icon, targetUrl } = navItem;
          return (
            <NavItem
              text={text}
              icon={icon}
              targetUrl={targetUrl}
              selected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}
      </ul>
      <button>버그 제보 & 건의하기</button>
    </aside>
  );
};

const NavItemList = [
  {
    text: "대시보드",
    icon: <TemplateIcon className="w-5 h-5" />,
    targetUrl: "/",
  },
  {
    text: "정보",
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
];

export default Sidebar;
