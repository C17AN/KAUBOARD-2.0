import React, { Dispatch, SetStateAction } from "react";
import TimePicker from "./TimePicker";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import Modal from "../../common/Modal";
import Tab, { TabItem } from "../../common/Tab";
import { TargetType } from ".";
import { format } from "date-fns";

type DdaySettingModalProps = {
  targetDate: string;
  setTargetDate: Dispatch<SetStateAction<string | null>>;
  targetType: any;
  setTargetType: Dispatch<SetStateAction<TargetType>>;
  handleClose: () => void;
};

const targetTypeData = [
  {
    name: "개강",
    value: "OPENING" as TargetType,
  },
  {
    name: "종강",
    value: "ENDING" as TargetType,
  },
] as TabItem[];

const DdaySettingModal = ({
  targetDate,
  targetType,
  setTargetDate,
  setTargetType,
  handleClose,
}: DdaySettingModalProps) => {
  const [, setItem] = useLocalStorageAsync();

  const handleTargetDateChange = (selectedDate: Date) => {
    setTargetDate(format(selectedDate, "yyyy-MM-dd"));
  };

  const handleTargetTypeChange = (targetType: TargetType) => {
    setTargetType(targetType);
  };

  const onTargetDataSubmit = async () => {
    await setItem("targetDate", targetDate);
    await setItem("targetType", targetType);
    handleClose();
  };

  return (
    <Modal>
      <div className="bg-white w-1/2 rounded-xl p-6 min-w-[24rem]">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">개강 · 종강일 설정</h2>
        <TimePicker selectedDate={targetDate} handleChange={handleTargetDateChange} />
        <div>
          <Tab itemList={targetTypeData} handleClick={handleTargetTypeChange} />
        </div>
        <div className="text-red-400 text-xs font-semibold mb-4">
          * 종강 및 개강 기준시간은 오전 9시입니다.
        </div>
        <div className="flex justify-end space-x-5 ml-auto">
          <button
            className="py-2 px-4 bg-red-400 hover:bg-red-500 transition-colors text-gray-50 rounded-lg font-semibold"
            onClick={handleClose}
          >
            취소
          </button>
          <button
            className="py-2 px-4 bg-emerald-400 hover:bg-emerald-500 transition-colors text-white rounded-lg font-semibold"
            onClick={onTargetDataSubmit}
          >
            설정
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DdaySettingModal;
