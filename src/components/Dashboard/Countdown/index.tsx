/*global chrome */
import React, { useEffect, useRef, useState } from "react";
import addLeadingZeros from "../../../utils/helpers/addLeadingZeros";
import DdaySettingModal from "./DdaySettingModal";
import useLocalStorageAsync from "../../../hooks/useLocalStorageAsync";
import { ClockIcon } from "@heroicons/react/outline";

export type TargetType = "OPENING" | "ENDING";

function CountDown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });
  const [targetDate, setTargetDate] = useState<string | null>(null);
  const [targetType, setTargetType] = useState<TargetType>("OPENING");
  const [isDdayModalVisible, setIsDdayModalVisible] = useState(false);
  const [getItem] = useLocalStorageAsync();
  const timer = useRef(0);

  const getInitialTimeData = async () => {
    const _targetDateTimestamp = await getItem("targetDate");
    console.log(_targetDateTimestamp);
    const _targetType = await getItem("targetType");
    setTargetDate(_targetDateTimestamp);
    setTargetType(_targetType);
  };

  useEffect(() => {
    getInitialTimeData();
  }, []);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      if (targetDate) {
        calculateCountdown(targetDate);
      }
    }, 1000);

    return () => {
      stop();
    };
  }, [targetDate, targetType]);

  // 카운트다운 로직 시작
  const calculateCountdown = (targetDate: string) => {
    const now = new Date();
    const targetDateTimestamp = new Date(targetDate).getTime();
    const morningTime = new Date(targetDateTimestamp);
    const targetDateString = morningTime.toString();
    const nowString = now.toString();
    let diff = (Date.parse(targetDateString) - Date.parse(nowString)) / 1000;
    // clear countdown when date is reached
    if (diff <= 0) {
      setTimeLeft({
        days: 0,
        hours: 0,
        min: 0,
        sec: 0,
      });
      return;
    }

    const timeLeft = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };

    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    setTimeLeft(timeLeft);
  };

  function stop() {
    clearInterval(timer.current);
  }

  return (
    <div className="h-full flex flex-col">
      <section className="flex items-center space-x-4 mb-4">
        <div className="flex space-x-2 items-center text-gray-700">
          <ClockIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">종강 타이머</h2>
        </div>
        <button
          className="flex items-center py-1 px-2 text-xs text-white hover:text-gray-600 hover:bg-slate-200 bg-kau-primary hover:bg-opacity-70 font-semibold transition-colors rounded-lg"
          onClick={() => setIsDdayModalVisible(true)}
        >
          <span>타이머 설정</span>
        </button>
      </section>
      {/* 디데이 직접 설정할 수 있는 세터 부분 */}
      <div className="bg-kau-primary/10 p-2 flex-1 rounded-lg">
        <section className="flex flex-1 h-full justify-center items-center space-x-5 bg-white border-[1px] border-gray-200 border-solid text-gray-500 font-semibold rounded-md p-4 shadow-sm">
          <div className="flex flex-col items-center w-[3rem]">
            <p className="text-5xl text-gray-600 mb-[2px]">{addLeadingZeros(timeLeft.days)}</p>
            <span className="text-xs text-gray-500">{timeLeft.days > 1 ? "Days" : "Day"}</span>
          </div>
          <span className="text-3xl">:</span>
          <div className="flex flex-col items-center w-[3rem]">
            <p className="text-5xl text-gray-600 mb-[2px]">{addLeadingZeros(timeLeft.hours)}</p>
            <span className="text-xs text-gray-500">{timeLeft.hours > 1 ? "Hours" : "Hour"}</span>
          </div>
          <span className="text-3xl">:</span>
          <div className="flex flex-col items-center w-[3rem]">
            <p className="text-5xl text-gray-600 mb-[2px]">{addLeadingZeros(timeLeft.min)}</p>
            <span className="text-xs text-gray-500">{timeLeft.min > 1 ? "Minutes" : "Minute"}</span>
          </div>
          <span className="text-3xl">:</span>
          <div className="flex flex-col items-center w-[3rem]">
            <p className="text-5xl text-gray-600 mb-[2px]">{addLeadingZeros(timeLeft.sec)}</p>
            <span className="text-xs text-gray-500">{timeLeft.sec > 1 ? "Seconds" : "Second"}</span>
          </div>
        </section>
      </div>
      {isDdayModalVisible && (
        <DdaySettingModal
          targetDate={targetDate!}
          targetType={targetType}
          setTargetDate={setTargetDate}
          setTargetType={setTargetType}
          handleClose={() => setIsDdayModalVisible(false)}
        />
      )}
    </div>
  );
}

export default CountDown;
