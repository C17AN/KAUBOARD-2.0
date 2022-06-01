/*global chrome */
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import addLeadingZeros from "../../../utils/helpers/addLeadingZeros";
// import "./CountDown.scss";

function CountDown() {
  const [state, setstate] = useState({
    days: 0,
    hours: 0,
    min: 0,
    sec: 0,
  });
  const [targetDate, setTargetDate] = useState<string | null>(null);
  const [targetType, setTargetType] = useState<string | null>(null);
  const [isSetterVisible, setIsSetterVisible] = useState(false);
  const timer = useRef(0);
  let interval = 0;

  useEffect(() => {
    /**
     * 배포 환경 코드 : 크롬의 storage api 사용
     */
    // chrome.storage.sync.get(["targetDate", "targetType"], function (result) {
    //   let storageDate = result.targetDate;
    //   setTargetDate(result.targetDate);
    //   setTargetType(result.targetType);
    //   interval = setInterval(() => {
    //     if (storageDate === undefined) {
    //       storageDate = null;
    //     }
    //     const date = calculateCountdown(storageDate);
    //     date ? setstate(date) : stop();
    //   }, 1000);
    // });

    /**
     * 로컬 환경 코드 : 브라우저의 localstorage api 사용
     */
    const targetDate = localStorage.getItem("targetDate");
    const targetType = localStorage.getItem("targetType");
    setTargetDate(targetDate);
    setTargetType(targetType);

    timer.current = window.setInterval(() => {
      if (targetDate !== null) {
        const date = calculateCountdown(targetDate);
        date ? setstate(date) : stop();
      }
    }, 1000);

    return () => {
      stop();
    };
  }, []);

  const onTargetDateChange = (e: any) => {
    setTargetDate(e.target.value);
  };
  const onTargetTypeChange = (e: any) => {
    setTargetType(e.target.value);
  };
  // 디데이 설정 버튼 누르면, 크롬 저장소에 저장하도록
  const onTargetDataSubmit = () => {
    // chrome.storage.sync.set({ targetDate: targetDate, targetType: targetType });
    localStorage.setItem("targetDate", targetDate ?? "");
    localStorage.setItem("targetType", targetType ?? "");
    setIsSetterVisible(false);
  };
  const setSetterVisible = () => {
    setIsSetterVisible(true);
  };
  const hideSetterVisible = () => {
    setIsSetterVisible(false);
  };

  // 카운트다운 로직 시작
  function calculateCountdown(endDate: string) {
    const endDateString = new Date(endDate).toString();
    const todayString = new Date().toString();
    let diff = (Date.parse(endDateString) - Date.parse(todayString)) / 1000;

    // clear countdown when date is reached
    if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
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

    return timeLeft;
  }

  function stop() {
    clearInterval(interval);
  }

  const countDown = state;

  return (
    <div>
      <section className="flex items-center mb-4">
        <h2 className="text-xl font-bold mr-4">종강 타이머</h2>
        <button
          className="py-1 px-2 text-xs text-white hover:text-gray-600 hover:bg-slate-200 bg-kau-primary hover:bg-opacity-70 font-semibold transition-colors rounded-lg"
          onClick={setSetterVisible}
        >
          타이머 설정
        </button>
      </section>
      {/* 디데이 직접 설정할 수 있는 세터 부분 */}
      <div
        className={classNames("bg-white", {
          block: isSetterVisible,
          hidden: !isSetterVisible,
        })}
      >
        <input type="date" onChange={onTargetDateChange} />
        <div className="Countdown__setter__radio" onChange={onTargetTypeChange}>
          <span>
            <input
              type="radio"
              id="opening"
              name="event"
              value="개강"
              onChange={onTargetTypeChange}
            ></input>
            <label htmlFor="opening">개강</label>
          </span>
          <span>
            <input
              type="radio"
              id="ending"
              name="event"
              value="종강"
              onChange={onTargetTypeChange}
            ></input>
            <label htmlFor="ending">종강</label>
          </span>
        </div>
        <div style={{ color: "#cf3d3d", fontSize: "0.6rem", margin: "0.5rem 0" }}>
          * 새로고침 후 변경 결과가 반영됩니다!
        </div>
        <div className="Countdown__setter__btn__container">
          <button className="Countdown__setter__cancel" onClick={hideSetterVisible}>
            취소
          </button>
          <button className="Countdown__setter__save" onClick={onTargetDataSubmit}>
            설정
          </button>
        </div>
      </div>
      <section>
        <div className="bg-white border-[1px] border-gray-200 border-solid rounded-md flex justify-center p-4 shadow-sm">
          <span className="Countdown-col">
            <span className="Countdown-col-element">
              <strong>{addLeadingZeros(countDown.days)}</strong>
              <span>{"Days"}</span>
            </span>
          </span>
          <span style={{ fontSize: "3rem" }}>/</span>
          <span className="Countdown-col">
            <span className="Countdown-col-element">
              <strong>{addLeadingZeros(countDown.hours)}</strong>
              <span>{"Hour"}</span>
            </span>
          </span>
          <span style={{ fontSize: "3rem" }}>:</span>

          <span className="Countdown-col">
            <span className="Countdown-col-element">
              <strong>{addLeadingZeros(countDown.min)}</strong>
              <span>{"Minute"}</span>
            </span>
          </span>

          <span style={{ fontSize: "3rem" }}>:</span>
          <span className="Countdown-col">
            <span className="Countdown-col-element">
              <strong>{addLeadingZeros(countDown.sec)}</strong>
              <span>{"Second"}</span>
            </span>
          </span>
        </div>
      </section>
    </div>
  );
}

export default CountDown;
