import React, { useEffect } from "react";
import CountDown from "../components/Dashboard/Countdown";
import FavoriteLinkList from "../components/Dashboard/FavoriteLink/List";
import Notice from "../components/Dashboard/Notification";
import TaskManager from "../components/Dashboard/TaskManager";
import styled from "@emotion/styled";
import PageTitle from "../components/common/PageTitle";
import { useRecoilState } from "recoil";
import { userNameAtom } from "../recoil/atom/application";
import SearchBar from "../components/Dashboard/SearchBar";

const Dashboard = () => {
  const [userName] = useRecoilState(userNameAtom);

  return (
    <Container className="flex flex-col h-full overflow-y-auto pr-6">
      <div className="w-full">
        <SearchBar />
      </div>
      <section className="flex space-x-12">
        <div className="flex-1 mb-4">
          <CountDown />
        </div>

        <div className="flex-1 mb-4">
          <TaskManager />
        </div>
      </section>
      <section className="flex-1 mb-4">
        <Notice />
      </section>
      <section className="flex-1 h-full">
        <FavoriteLinkList />
      </section>
      {/* <QuickLinkFloatingButton handleClick={() => {}} /> */}
    </Container>
  );
};

const Container = styled.div`
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7e76be60;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background-color: rgb(236, 236, 236);
    border-radius: 12px;
  }
`;

export default Dashboard;
