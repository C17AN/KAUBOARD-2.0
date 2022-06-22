import { format } from "date-fns";
import React, { Dispatch, useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import CancelButton from "../../common/Button/CancelButton";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Input from "../../common/Input";
import Modal from "../../common/Modal";
import "../../../styles/timepicker.scss";
import Tab, { TabItem } from "../../common/Tab";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import { Task, TaskImportanceType, TaskType } from "../../../types/Task";
import { v4 as uuidv4 } from "uuid";
import formatDate from "../../../utils/helpers/formatDate";
import sortTaskByStartingTime from "../../../utils/helpers/sortTaskByStartingTime";
import isEmpty from "../../../utils/helpers/isEmpty";

type TaskUploadModalProps = {
  selectedDate: Date;
  setDayTaskList: Dispatch<React.SetStateAction<Task[]>>;
  dayTaskList: Task[];
  handleClose: () => void;
};

const TaskUploadModal = ({
  selectedDate,
  handleClose,
  dayTaskList,
  setDayTaskList,
}: TaskUploadModalProps) => {
  const now = new Date(selectedDate);
  const formattedDate = formatDate(selectedDate);
  // startTime, endTime : UTC+9 적용된 날짜 상태, 실제 스토리지 저장용
  const [localStartTime, setLocalStartTime] = useState<Date | null>(null);
  const [localEndTime, setLocalEndTime] = useState<Date | null>(null);

  // startTime, endTime : 연산용 날짜 상태
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // startTimeString, endTimeString : placeholder 출력용 날짜 상태
  const [startTimeString, setStartTimeString] = useState<string | null>(null);
  const [endTimeString, setEndTimeString] = useState<string | null>(null);
  const [taskType, setTaskType] = useState<TaskType>("DAILY");
  const [taskImportance, setTaskImportance] = useState<TaskImportanceType>("LOW");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [getItem, setItem] = useLocalStorageAsync();
  const [isFormValid, setIsFormValid] = useState(false);

  const todayMidnight = new Date(new Date(formattedDate).getTime() - 9 * 60 * 60 * 1000);
  const tomorrowMidnight = new Date(
    new Date(formattedDate).getTime() - 9 * 60 * 60 * 1000 + 24 * 60 * 60 * 1000 - 1000
  );

  const submitTask = async () => {
    const newTask = {
      id: uuidv4(),
      startTime: format(new Date(startTime!), "yyyy-MM-dd:HH:mm"),
      endTime: format(new Date(endTime!), "yyyy-MM-dd:HH:mm"),
      taskImportance,
      taskType,
      description,
      location,
      isCompleted: false,
    } as Task;

    try {
      const _taskList = await getItem("tasks");
      const taskList = isEmpty(_taskList) ? {} : { ..._taskList };
      const dayTaskList = taskList[formattedDate] ?? [];
      const sortedDayTaskList = [...dayTaskList, newTask].sort(sortTaskByStartingTime);
      setDayTaskList(sortedDayTaskList);
      await setItem("tasks", { ...taskList, [formattedDate]: sortedDayTaskList });
    } catch (err) {
      setDayTaskList([]);
      await setItem("tasks", []);
    }
    handleClose();
  };

  useEffect(() => {
    if (startTime && endTime && description) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [startTime, endTime, description]);

  return (
    <Modal>
      <div className="flex flex-col bg-white min-h-[38rem] min-w-[30rem] py-4 px-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">{format(now, "MM월 dd일")}</h2>
        <section className="flex-1 text-gray-500 font-semibold space-y-6">
          <div className="mb-4">
            <h3 className="text-lg text-gray-500 font-bold mb-2">
              <span className="text-red-400 mr-1 align-middle">*</span>활동시간
            </h3>
            <div className="flex flex-1 justify-between">
              <ReactDatePicker
                value={startTimeString ?? ""}
                placeholderText={"시작시간을 입력하세요"}
                onChange={(date) => {
                  setStartTime(date);
                  setStartTimeString(format(new Date(date!), "HH시 mm분"));
                }}
                locale="ko"
                minTime={todayMidnight}
                maxTime={endTime ?? tomorrowMidnight}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="시작 시간"
                className="bg-gray-50 w-[12rem] flex-1 rounded-md py-2 px-4 cursor-pointer focus:outline-none focus:bg-gray-200 transition-colors text-sm text-gray-600 font-semibold"
              />
              <ReactDatePicker
                value={endTimeString ?? ""}
                placeholderText={"종료시간을 입력하세요"}
                onChange={(date) => {
                  setEndTime(date);
                  setEndTimeString(format(new Date(date!), "HH시 mm분"));
                }}
                locale="ko"
                minTime={startTime ?? tomorrowMidnight}
                maxTime={tomorrowMidnight}
                showTimeSelect
                showTimeSelectOnly
                timeCaption="종료 시간"
                className="bg-gray-50 w-[12rem] flex-1 rounded-md py-2 px-4 cursor-pointer focus:outline-none focus:bg-gray-200 transition-colors text-sm text-gray-600 font-semibold"
              />
            </div>
          </div>
          <section>
            <h3 className="text-lg text-gray-500 font-bold">
              <span className="text-red-400 mr-1 align-middle">*</span>내용
            </h3>
            <Input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder={"내용을 입력해주세요 (최대 25자)"}
              maxLength={25}
            />
          </section>
          <section className="w-full">
            <h3 className="text-lg text-gray-500 font-bold">장소</h3>
            <Input
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              placeholder={"장소를 입력해주세요 (최대 20자)"}
              maxLength={20}
            />
          </section>
          <section>
            <h3 className="text-lg text-gray-500 font-bold">유형</h3>
            <Tab itemList={taskTypeData} handleClick={setTaskType} />
          </section>
          <section>
            <h3 className="text-lg text-gray-500 font-bold">중요도</h3>
            <Tab itemList={importanceTypeData} handleClick={setTaskImportance} />
          </section>
        </section>
        <div className="justify-self-end space-x-5 text-right mt-auto">
          <CancelButton text="취소" handleClick={handleClose} />
          <ConfirmButton text="추가" handleClick={submitTask} disabled={!isFormValid} />
        </div>
      </div>
    </Modal>
  );
};

const taskTypeData = [
  {
    name: "일상",
    value: "DAILY",
  },
  {
    name: "과제 & 시험",
    value: "ASSIGNMENT",
  },
  {
    name: "모임",
    value: "MEETING" as TaskType,
  },
] as TabItem[];

const importanceTypeData = [
  {
    name: "낮음",
    value: "LOW" as TaskImportanceType,
  },
  {
    name: "보통",
    value: "MEDIUM" as TaskImportanceType,
  },
  {
    name: "높음",
    value: "HIGH" as TaskImportanceType,
  },
] as TabItem[];

export default TaskUploadModal;
