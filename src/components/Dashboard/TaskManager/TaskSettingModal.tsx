import React, { useMemo } from "react";
import Modal from "../../common/Modal";
import moment from "moment";
import "moment/locale/ko";
import { Calendar, Views, DateLocalizer, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

type TaskSettingModalProps = {
  onClick: () => void;
  handleClose: () => void;
};

const myEventsList = [{ start: new Date(), end: new Date(), title: "특별한 이벤트" }];

const localizer = momentLocalizer(moment);

const TaskSettingModal = ({ onClick, handleClose }: TaskSettingModalProps) => {
  return (
    <Modal>
      <div className="flex flex-col bg-white rounded-lg p-4 min-w-[75vw] h-[80vh]">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          className="flex-1 mb-4 overflow-y-auto"
        />
        <div className="flex justify-end space-x-5 ml-auto">
          <button
            className="py-2 px-4 bg-red-400 hover:bg-red-500 transition-colors text-gray-50 rounded-lg font-semibold"
            onClick={handleClose}
          >
            취소
          </button>
          <button className="py-2 px-4 bg-emerald-400 hover:bg-emerald-500 transition-colors text-white rounded-lg font-semibold">
            설정
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskSettingModal;
