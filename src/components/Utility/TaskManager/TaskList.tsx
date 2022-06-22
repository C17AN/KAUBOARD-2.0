import React, { Dispatch, useState } from "react";
import {
  Step,
  StepContent,
  stepIconClasses,
  StepLabel,
  stepLabelClasses,
  Stepper,
} from "@mui/material";
import { Task, TaskType } from "../../../types/Task";
import TaskTypeItem from "./TaskTypeItem";
import TaskDeleteModal from "./TaskDeleteModal";
import styled from "@emotion/styled";
import { format } from "date-fns";
import { ArrowSmRightIcon, ClockIcon, TrashIcon } from "@heroicons/react/outline";
import classNames from "classnames";

type TaskListProps = {
  selectedDate: Date;
  dayTaskList: Task[];
  setDayTaskList: Dispatch<React.SetStateAction<Task[]>>;
};

const TaskList = ({ selectedDate, dayTaskList, setDayTaskList }: TaskListProps) => {
  const [isTaskDeleteModalOpen, setIsTaskDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <>
      <div className="h-full relative">
        {dayTaskList.length > 0 ? (
          <Stepper orientation="vertical">
            {dayTaskList.map((task, index) => {
              const {
                startTime,
                endTime,
                description,
                location,
                taskType,
                taskImportance,
                isCompleted,
              } = task;
              const isImportant = taskImportance === "HIGH";
              return (
                <Step key={index} active={true}>
                  <StyledStepLabel
                    StepIconProps={{
                      style: {
                        color: "#b0b2d9",
                      },
                    }}
                  >
                    <div className="flex items-center">
                      <div className="space-x-1 mr-2 flex">
                        <TaskTypeItem taskType={taskType} />
                      </div>
                    </div>
                  </StyledStepLabel>
                  <StepContent>
                    <TaskContainer
                      taskType={taskType}
                      isCompleted={isCompleted}
                      className="relative flex flex-col overflow-hidden bg-white pr-4 py-3 text-gray-500 rounded-lg border border-solid border-gray-200 shadow"
                    >
                      <div className="flex justify-between mb-2">
                        <div className="flex items-center">
                          {isImportant && <TaskTypeItem taskType={taskImportance} />}
                          <h2 className={classNames("font-bold text-lg", isImportant && "-ml-1")}>
                            {description}
                          </h2>
                        </div>
                        <TrashIcon
                          className="w-7 h-7 text-gray-500 hover:bg-gray-100 rounded-lg p-1 transition-colors cursor-pointer"
                          onClick={() => {
                            setSelectedTask(task);
                            setIsTaskDeleteModalOpen(true);
                          }}
                        />
                      </div>
                      <section className="flex items-center text-gray-500/80 text-xs mb-2 font-semibold">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{startTime && format(new Date(startTime), "HH시 mm분")}</span>
                        <ArrowSmRightIcon className="w-4 h-4 mx-1" />
                        <span>{endTime && format(new Date(endTime), "HH시 mm분")}</span>
                      </section>
                      <section className="flex justify-between items-center">
                        <div className="text-gray-400 text-xs">{location}</div>
                        <div className="space-x-4 text-right">
                          {/* {activeStep > 0 && (
                            <CancelButton handleClick={handleBack} text="돌아가기" size="SMALL" />
                          )} */}
                          {/*
                          TODO: 일정 완료 버튼이 필요할까? 
                          <ConfirmButton handleClick={handleNext} text="완료" size="SMALL" />
                          */}
                        </div>
                      </section>
                    </TaskContainer>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        ) : (
          <div className="h-full flex flex-col space-y-1 justify-center items-center text-center w-full">
            <h2 className="text-gray-500/80 font-semibold text-xl text-center">
              오늘의 일정이 없습니다.
            </h2>
            <p className="text-sm font-light text-gray-500">
              [일정 추가] 를 선택해 새 일정을 추가해보세요.
            </p>
          </div>
        )}
      </div>
      {isTaskDeleteModalOpen && selectedTask && (
        <TaskDeleteModal
          handleClose={() => setIsTaskDeleteModalOpen(false)}
          selectedDate={selectedDate}
          selectedTask={selectedTask}
          setDayTaskList={setDayTaskList}
        />
      )}
    </>
  );
};

const TaskContainer = styled.div<{ taskType: TaskType; isCompleted: boolean }>`
  & {
    padding-left: 2rem;
  }

  &::after {
    content: "";
    width: 1.125rem;
    height: 100%;
    background-color: ${({ taskType }) => {
      if (taskType === "ASSIGNMENT") {
        return "rgb(251 113 133 / 0.8)";
      } else if (taskType === "DAILY") {
        return "rgb(20 184 166 / 0.8)";
      } else if (taskType === "MEETING") {
        return "rgb(56 189 248 / var(--tw-bg-opacity))";
      }
    }};
    opacity: ${({ isCompleted }) => (isCompleted ? 0.2 : 1)};
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
  [`&.${stepIconClasses.text}`]: {
    fill: "blue",
    color: "red",
    fontSize: 100,
  },
  [`&.${stepLabelClasses.label}`]: {
    fill: "blue",
  },
}));

export default TaskList;
