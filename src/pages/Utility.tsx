import React from "react";
import Memo from "../components/Utility/Memo/List";
import TaskManager from "../components/Utility/TaskManager";

const Utility = () => {
  return (
    <>
      <h2 className="text-4xl font-bold text-gray-700">유틸리티</h2>
      <div className="bg-kau-primary h-[2px] my-4 rounded-2xl bg-opacity-40" />
      <section className="flex gap-8 h-5/6">
        <div className="flex-[3] h-full">
          <TaskManager />
        </div>
        <div className="flex-[3]">
          <Memo />
        </div>
      </section>
    </>
  );
};

export default Utility;
