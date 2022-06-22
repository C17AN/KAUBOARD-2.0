import classNames from "classnames";
import React from "react";
import { TaskImportanceType, TaskType } from "../../../types/Task";
import parseTaskType from "../../../utils/helpers/parseTaskType";

type TaskTypeItemProps = {
  taskType: TaskType | TaskImportanceType;
};

const taskTypeStyle = (taskType: TaskType | TaskImportanceType) => {
  switch (taskType) {
    case "ASSIGNMENT":
      return "bg-rose-400/80 text-white";
    case "DAILY":
      return "bg-teal-500/80 text-white";
    case "MEETING":
      return "bg-sky-400 text-white";
    case "HIGH":
      return "bg-red-500 text-white mr-4 text-xs";
    default:
      return "bg-gray-400 text-white";
  }
};

const TaskTypeItem = ({ taskType }: TaskTypeItemProps) => {
  return (
    <div
      className={classNames(
        "flex items-center font-semibold rounded-lg text-xs py-1 px-2 mr-3",
        taskTypeStyle(taskType)
      )}
    >
      {parseTaskType(taskType)}
    </div>
  );
};

export default TaskTypeItem;
