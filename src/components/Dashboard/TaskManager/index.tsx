import React, { useEffect, useState } from "react";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import TaskItem from "./TaskItem";
import formatDate from "../../../utils/helpers/formatDate";
import { Task } from "../../../types/Task";
import { ClockIcon, LightBulbIcon } from "@heroicons/react/outline";

const today = new Date();

const TaskManager = () => {
  const [dayTaskList, setDayTaskList] = useState<Task[]>([]);
  const [getItem] = useLocalStorageAsync();

  const getTaskList = async () => {
    const taskList = (await getItem("tasks")) ?? [];
    const formattedDate = formatDate(today);
    const _dayTaskList = taskList[formattedDate];
    setDayTaskList(_dayTaskList);
  };

  useEffect(() => {
    getTaskList();
  }, []);

  return (
    <>
      <section className="flex items-center space-x-4 mb-4">
        <div className="flex space-x-2 items-center">
          <LightBulbIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold">오늘의 일정</h2>
        </div>
      </section>
      <ul className="px-4 py-3 items-center justify-center space-y-4 bg-white  rounded-md border-[1px] border-gray-200 border-solid shadow-sm overflow-y-auto h-[9rem]">
        {dayTaskList?.length > 0 ? (
          dayTaskList.map((task) => {
            return <TaskItem key={task.id} {...task} />;
          })
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl font-semibold text-gray-400">오늘의 일정이 없습니다.</p>
          </div>
        )}
      </ul>
    </>
  );
};

export default TaskManager;
