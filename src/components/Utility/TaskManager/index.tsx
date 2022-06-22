import React, { useEffect, useState } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import TaskUploadModal from "./TaskUploadModal";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import TaskList from "./TaskList";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import formatDate from "../../../utils/helpers/formatDate";
import { Task } from "../../../types/Task";
import { isEmpty } from "@firebase/util";

setDefaultLocale("ko");

const TaskManager = () => {
  const [isTaskUploadModalOpen, setIsTaskUploadModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [getItem] = useLocalStorageAsync();
  const formattedDate = formatDate(selectedDate || new Date());
  const [dayTaskList, setDayTaskList] = useState<Task[]>([]);

  const getTaskList = async () => {
    try {
      const _taskList = (await getItem("tasks")) ?? {};
      const taskList = isEmpty(_taskList) ? {} : { ..._taskList };
      const dayTaskList: Task[] = taskList[formattedDate] ?? [];
      setDayTaskList(dayTaskList);
    } catch (err) {
      setDayTaskList([]);
    }
  };

  useEffect(() => {
    getTaskList();
  }, [selectedDate]);

  return (
    <div className="h-full">
      <section className="flex items-center mb-4 text-gray-600">
        <PencilAltIcon className="w-5 h-5 mr-2" />
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-[6px]">일정 관리</span>
        </h2>
      </section>
      <section className="flex flex-col bg-white/90 h-full border border-solid border-gray-200 rounded-lg p-4 shadow">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-600 font-semibold text-lg mb-3">날짜 선택</h2>
            <button
              className="flex items-center py-1 px-2 text-xs text-white hover:text-gray-600 hover:bg-slate-200 bg-kau-primary hover:bg-opacity-70 font-semibold transition-colors rounded-lg"
              onClick={() => {
                setIsTaskUploadModalOpen(true);
              }}
            >
              일정 추가
            </button>
          </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
            }}
            locale="ko"
            className="bg-gray-50 w-full rounded-md py-2 px-4 cursor-pointer focus:outline-none focus:bg-gray-200 transition-colors text-sm text-gray-600 font-semibold"
          />
        </div>
        <h2 className="text-gray-600 font-semibold text-lg mb-3">일정 목록</h2>
        <div className="h-full overflow-y-auto pr-4">
          {selectedDate && (
            <TaskList
              dayTaskList={dayTaskList}
              selectedDate={selectedDate}
              setDayTaskList={setDayTaskList}
            />
          )}
        </div>
      </section>
      {isTaskUploadModalOpen && selectedDate && (
        <TaskUploadModal
          selectedDate={selectedDate}
          setDayTaskList={setDayTaskList}
          dayTaskList={dayTaskList}
          handleClose={() => {
            setIsTaskUploadModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TaskManager;
