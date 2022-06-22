export type TaskType = "DAILY" | "ASSIGNMENT" | "MEETING";
export type TaskImportanceType = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: string;
  description: string;
  startTime: string | null;
  endTime: string | null;
  taskType: TaskType;
  taskImportance: TaskImportanceType;
  isCompleted: boolean;
  location?: string;
};
