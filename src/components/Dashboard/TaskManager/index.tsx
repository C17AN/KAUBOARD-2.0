import React, { useEffect, useRef, useState } from "react";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import TaskItem from "./TaskItem";
import formatDate from "../../../utils/helpers/formatDate";
import { Task } from "../../../types/Task";
import { ClockIcon, LightBulbIcon } from "@heroicons/react/outline";
import { format } from "date-fns";

const now = new Date();

const TaskManager = () => {
  const [dayTaskList, setDayTaskList] = useState<Task[]>([]);
  const [getItem] = useLocalStorageAsync();
  const currentTaskRef = useRef<HTMLLIElement>(null);

  const getTaskList = async () => {
    const taskList = (await getItem("tasks")) ?? {};
    const formattedDate = formatDate(now);
    const _dayTaskList = taskList[formattedDate] ?? [];
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
          <h2 className="text-xl font-bold text-gray-600">다가오는 일정</h2>
        </div>
      </section>
      <ul className="p-2 items-center justify-center space-y-4 bg-kau-primary/10 rounded-md border-[1px] border-gray-200 border-solid shadow-sm overflow-y-auto h-[9rem]">
        {dayTaskList?.length > 0 ? (
          dayTaskList.map((task) => {
            const { id, startTime, endTime } = task;
            const formattedCurrentTime = format(now, "yyyy-MM-dd:HH:mm");
            let isCurrentTask = false;
            if (formattedCurrentTime > startTime! && formattedCurrentTime < endTime!) {
              isCurrentTask = true;
            }
            return <TaskItem key={id} {...task} ref={isCurrentTask ? currentTaskRef : null} />;
          })
        ) : (
          <div className="flex justify-center items-center h-full bg-white/90">
            <p className="text-xl font-semibold text-gray-400">오늘은 남은 일정이 없습니다.</p>
          </div>
        )}
      </ul>
    </>
  );
};

export default TaskManager;
