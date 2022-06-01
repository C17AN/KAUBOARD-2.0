import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import DesktopLayout from "./layouts/Desktop";
import Community from "./pages/Community";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import "./styles/reset.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter>
    <DesktopLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </DesktopLayout>
  </BrowserRouter>
);
