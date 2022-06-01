import React, { useState } from "react";
import { ReactNode } from "react";
import Sidebar from "../components/common/Sidebar";

type DesktopLayoutProps = {
  children: ReactNode;
};

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const [value, setValue] = useState("사이드바");
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="bg-slate-100 flex-1">{children}</div>
    </div>
  );
};

export default DesktopLayout;
