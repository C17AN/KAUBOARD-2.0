import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/Dashboard";
import DesktopLayout from "./layouts/Desktop";
import Community from "./pages/Community";
import Info from "./pages/Utility";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import { initializeApp } from "firebase/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "firebase/auth";
import "firebase/database";
import "./styles/index.css";
import "./styles/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter>
    <AnimatePresence>
      <DesktopLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/info" element={<Info />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/community" element={<Community />} />
          <Route path="/setting" element={<Settings />} />
        </Routes>
      </DesktopLayout>
    </AnimatePresence>
  </BrowserRouter>
);
