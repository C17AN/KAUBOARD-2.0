import { TaskImportanceType, TaskType } from "../../types/Task";

const parseTaskType = (taskType: TaskType | TaskImportanceType) => {
  switch (taskType) {
    case "ASSIGNMENT":
      return "과제 / 시험";
    case "DAILY":
      return "일상";
    case "MEETING":
      return "모임";
    case "HIGH":
      return "중요";
  }
};

export default parseTaskType;
