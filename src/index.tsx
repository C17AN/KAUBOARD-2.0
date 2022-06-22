import React, { memo, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./pages/Dashboard";
import DesktopLayout from "./layouts/Desktop";
import Community from "./pages/Community";
import Info from "./pages/Utility";
import useLocalStorageAsync from "./hooks/useLocalStorageAsync";
import Gallery from "./pages/Gallery";
import Settings from "./pages/Settings";
import generateRandomUserName from "./utils/helpers/generateRandomUserName";
import getFormattedNextWeekDay, { Day } from "./utils/helpers/getFormattedNextWeekDay";
import formatDate from "./utils/helpers/formatDate";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AnimatePresence, DragControls } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot, useRecoilState } from "recoil";
import { isAuthenticatedAtom, userEmailAtom } from "./recoil/atom/authentication";
import { authService } from "./firebase/Config";
import { maxUploadQuotaAtom, userNameAtom } from "./recoil/atom/application";
import { MAX_WEEKLY_UPLOAD_QUOTA } from "./utils/contants/application";
import "firebase/auth";
import "firebase/database";
import "./styles/index.css";
import "./styles/reset.css";
import "react-toastify/dist/ReactToastify.css";
import isEmpty from "./utils/helpers/isEmpty";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const queryClient = new QueryClient();
const today = new Date();

const RootComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [, setUserName] = useRecoilState(userNameAtom);
  const [getItem, setItem] = useLocalStorageAsync();
  const [, setUserEmail] = useRecoilState(userEmailAtom);
  const [uploadQuota, setUploadQuota] = useRecoilState(maxUploadQuotaAtom);
  const randomUserName = useMemo(generateRandomUserName, []);
  const nextMonday = useMemo(() => getFormattedNextWeekDay(Day["MONDAY"]), []);

  const initializeUserName = async () => {
    const userName = (await getItem("userName")) ?? randomUserName;
    setItem("userName", userName);
    setUserName(userName);
  };

  const initializeUploadQuota = async () => {
    const uploadQuota = await getItem("uploadQuota");
    setUploadQuota(() => uploadQuota);
  };

  const initializeMemoList = async () => {
    const _memoList = await getItem("memos");
    if (isEmpty(_memoList)) {
      await setItem("memos", []);
    }
  };

  const initializeTaskList = async () => {
    const _taskList = await getItem("tasks");
    if (isEmpty(_taskList)) {
      await setItem("tasks", {});
    }
  };

  const supplyUploadQuota = async () => {
    // 쿼터 제공 날짜가 존재하지 않으면, 오늘 날짜로 기록한다.
    const nextQuotaSupplyDate = (await getItem("nextQuotaSupplyDate")) || new Date().getTime();
    if (today.getTime() >= new Date(nextQuotaSupplyDate).getTime() - 5000) {
      setItem("nextQuotaSupplyDate", formatDate(new Date(nextMonday)));
      setItem("uploadQuota", MAX_WEEKLY_UPLOAD_QUOTA);
      setUploadQuota(MAX_WEEKLY_UPLOAD_QUOTA);
    }
  };

  const initData = async () => {
    await initializeUserName();
    await supplyUploadQuota();
    await initializeMemoList();
    await initializeTaskList();
    await initializeUploadQuota();
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    authService?.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserEmail(user?.email!);
      } else {
        setIsAuthenticated(false);
        setUserEmail(null!);
      }
    });
  }, []);

  return <>{children}</>;
};

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <HashRouter>
        <AnimatePresence>
          <RootComponent>
            <DesktopLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/info" element={<Info />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/community" element={<Community />} />
                <Route path="/setting" element={<Settings />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </DesktopLayout>
          </RootComponent>
        </AnimatePresence>
      </HashRouter>
    </RecoilRoot>
  </QueryClientProvider>
);
