import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";

type TimePickerProps = {
  handleChange: (selectedDate: Date) => void;
  selectedDate?: string;
};

registerLocale("ko", ko);
setDefaultLocale("ko");

const TimePicker = ({ handleChange, selectedDate }: TimePickerProps) => {
  return (
    <DatePicker
      selected={selectedDate ? new Date(selectedDate) : null}
      onChange={handleChange}
      locale="ko"
      className="bg-gray-50 w-full rounded-md py-2 px-4 cursor-pointer focus:outline-none focus:bg-gray-200 transition-colors text-sm text-gray-600 font-semibold"
    />
  );
};

export default TimePicker;
