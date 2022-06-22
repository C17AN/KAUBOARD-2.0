import { Task } from "../../types/Task";

const sortTaskByStartingTime = (taskA: Task, taskB: Task) => {
  const startTimeA = new Date(taskA.startTime!).getTime();
  const startTimeB = new Date(taskB.startTime!).getTime();
  return startTimeA - startTimeB;
};

export default sortTaskByStartingTime;
