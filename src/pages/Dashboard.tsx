import React from "react";
import { Link } from "react-router-dom";
import CountDown from "../components/Dashboard/Countdown";
import Favorite from "../components/Dashboard/Favorite";
import Notice from "../components/Dashboard/Notification";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <h2 className="font-bold text-4xl text-gray-700">안녕하세요, 찬민 님</h2>
      <section className="my-8">
        <CountDown />
      </section>
      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">공지사항</h2>
        <Notice />
      </section>
      <section className="my-8">
        <h2 className="text-xl font-bold mb-4">즐겨찾기</h2>
        <Favorite />
      </section>
    </>
  );
};

export default Dashboard;
