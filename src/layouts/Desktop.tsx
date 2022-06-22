import styled from "@emotion/styled";
import React, { useState } from "react";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/common/Sidebar";
import DarkModeButton from "../components/Dashboard/DarkModeButton";

type DesktopLayoutProps = {
  children: ReactNode;
};

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="relative bg-kau-primary/10 bg-opacity-80 flex-1 p-4 overflow-y-hidden">
        <Container className="bg-white/90 rounded-lg p-6 h-full">{children}</Container>
      </div>
      <ToastContainer />
    </div>
  );
};

const Container = styled.div`
  &::after {
    content: "";
    top: 0;
    left: 0;
    z-index: -10;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 1;
    background: url("/images/background.png") no-repeat 50%;
  }
`;

export default DesktopLayout;
