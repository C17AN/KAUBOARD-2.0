import React, { useState } from "react";
import NavItem from "./NavItem";
import { ChatAltIcon, DesktopComputerIcon, TemplateIcon } from "@heroicons/react/outline";

type SidebarProps = {};

const FIRST_NAV_ITEM = 0;

const Sidebar = ({}: SidebarProps) => {
  const [selectedIndex, setSelectedIndex] = useState(FIRST_NAV_ITEM);

  return (
    <aside className="w-64 border-r-[1px] border-r-slate-300 border-solid p-8 dark:bg-black">
      <h2 className="mb-4">프로필</h2>
      <ul className="flex flex-col gap-4">
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
    text: "커뮤니티",
    icon: <ChatAltIcon className="w-5 h-5" />,
    targetUrl: "/community",
  },
];

export default Sidebar;
