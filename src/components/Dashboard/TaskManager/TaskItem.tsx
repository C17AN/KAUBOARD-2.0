import React, { forwardRef, useEffect } from "react";
import parseTaskType from "../../../utils/helpers/parseTaskType";
import TaskTypeItem from "../../Utility/TaskManager/TaskTypeItem";
import { Task } from "../../../types/Task";
import { format } from "date-fns";
import { ClockIcon } from "@heroicons/react/outline";

const TaskItem = forwardRef<HTMLLIElement, Task>(
  ({ id, taskType, taskImportance, description, location, startTime, endTime }, ref) => {
    const isImportant = taskImportance === "HIGH";
    useEffect(() => {
      if (ref && typeof ref !== "function") {
        ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, []);

    return (
      <li
        ref={ref}
        className="flex flex-col h-full w-full justify-between bg-white border border-solid border-gray-200/50 px-3 py-2 rounded-lg shadow-sm"
      >
        <section className="flex items-center">
          <TaskTypeItem taskType={taskType} />
          {isImportant && <TaskTypeItem taskType={taskImportance} />}
          <p className="font-bold text-gray-600/80 text-lg">{description}</p>
        </section>
        <div className="text-2xl text-gray-500/90 flex font-semibold items-center justify-center">
          <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
          <p>{format(new Date(startTime!), "HH:mm")}</p>
          <span className="mx-1">~</span>
          <p>{format(new Date(endTime!), "HH:mm")}</p>
        </div>
        {/* <div className="bg-kau-primary/30 rounded-lg w-[12rem] h-[2px] -mt-1 mx-auto" /> */}
        <p className="text-xs text-gray-400 text-center mb-2">
          {location ? location : "장소가 설정되지 않았습니다."}
        </p>
      </li>
    );
  }
);

export default TaskItem;
