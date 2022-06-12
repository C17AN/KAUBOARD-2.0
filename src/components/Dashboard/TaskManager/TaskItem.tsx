import React from "react";
import parseTaskType from "../../../utils/helpers/parseTaskType";
import TaskTypeItem from "../../Utility/TaskManager/TaskTypeItem";
import { Task } from "../../../types/Task";
import { format } from "date-fns";
import { ClockIcon } from "@heroicons/react/outline";

const TaskItem = ({ id, taskType, description, location, startTime, endTime }: Task) => {
  return (
    <li className="flex w-full justify-between items-center bg-gray-50/20 border border-solid border-gray-200/50 px-3 py-2 rounded-lg shadow-sm">
      <section className="flex items-center space-x-4">
        <TaskTypeItem taskType={taskType} />
        <p className="font-semibold text-gray-600">{description}</p>
      </section>
      <div className="text-xs text-gray-500 flex">
        <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
        <p>{format(new Date(startTime!), "HH:mm")}</p>
        <span className="mx-1">~</span>
        <p>{format(new Date(endTime!), "HH:mm")}</p>
        {location && (
          <>
            <p className="mx-2">/</p>
            <p>{location}</p>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
