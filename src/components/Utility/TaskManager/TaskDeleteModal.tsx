import { ExclamationIcon } from "@heroicons/react/outline";
import React, { Dispatch } from "react";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import { Task } from "../../../types/Task";
import formatDate from "../../../utils/helpers/formatDate";
import isEmpty from "../../../utils/helpers/isEmpty";
import CancelButton from "../../common/Button/CancelButton";
import ConfirmButton from "../../common/Button/ConfirmButton";
import Modal from "../../common/Modal";

type TaskDeleteModalProps = {
  handleClose: () => void;
  selectedTask: Task;
  selectedDate: Date;
  setDayTaskList: Dispatch<React.SetStateAction<Task[]>>;
};

const TaskDeleteModal = ({
  handleClose,
  selectedTask,
  selectedDate,
  setDayTaskList,
}: TaskDeleteModalProps) => {
  const { description, id } = selectedTask;
  const [getItem, setItem] = useLocalStorageAsync();

  const deleteTask = async () => {
    const _taskList = await getItem("tasks");
    const taskList = isEmpty(_taskList) ? {} : { ..._taskList };
    const formattedDate = formatDate(selectedDate);
    const dayTaskList: Task[] = taskList[formattedDate];
    const filteredDayTaskList = dayTaskList.filter((dayTask) => {
      const targetId = dayTask.id;
      return !(targetId === id);
    });
    setDayTaskList([...filteredDayTaskList]);
    setItem("tasks", { taskList, [formattedDate]: [...filteredDayTaskList] });
    handleClose();
  };

  return (
    <Modal>
      <div className="flex flex-col bg-white rounded-lg min-w-[22rem] p-4">
        <section className="flex items-center mb-6">
          <ExclamationIcon className="w-8 h-8 mr-4 text-red-500" />
          <div>
            <h2 className="text-gray-600 font-bold text-lg">해당 일정을 정말 삭제하시겠습니까?</h2>
            <span className="inline-block text-xs text-gray-500">
              삭제한 일정 정보는 복구할 수 없습니다.
            </span>
          </div>
        </section>
        <div className="mt-auto text-right space-x-4">
          <CancelButton text="취소" handleClick={handleClose} />
          <ConfirmButton text="확인" handleClick={deleteTask} />
        </div>
      </div>
    </Modal>
  );
};

export default TaskDeleteModal;
