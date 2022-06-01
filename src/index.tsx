import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import DesktopLayout from "./layouts/Desktop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Community from "./pages/Community";
import "./styles/index.css";
import "./styles/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <DesktopLayout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  </DesktopLayout>
);
