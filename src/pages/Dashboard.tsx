import React from "react";
import { Link } from "react-router-dom";
import CountDown from "../components/Dashboard/Countdown";
import Notice from "../components/Dashboard/Notification";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">안녕하세요, 찬민 님</h2>
      <p className="py-4">종강까지 남은 시간</p>
      <CountDown />
      <Link to="community">커뮤니티</Link>
      {/* <Notice /> */}
    </div>
  );
};

export default Dashboard;
