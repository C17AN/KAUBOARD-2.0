import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import getWeather from "../../../../apis/weather";
import { BACKEND_ENDPOINT } from "../../../../utils/contants/endpoints";
import { useQuery } from "react-query";

type WeatherType = {
  currentIcon: string;
  currentTemp: number;
  perceptionTemp: number;
  weeklyIcon: string[];
  weeklyTemp: number[];
};

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherType>({
    currentIcon: "",
    currentTemp: 0,
    perceptionTemp: 0,
    weeklyIcon: [],
    weeklyTemp: [],
  });
  const [status, setStatus] = useState(0);
  const { currentIcon, currentTemp, perceptionTemp } = weatherData;
  const { data, isSuccess } = useQuery("weather", getWeather, {
    staleTime: 1000 * 60 * 5,
    onSuccess: (data) => {
      setWeatherData(data);
    },
  });

  return (
    <div className="flex space-x-2 items-center -mx-2">
      {isSuccess && (
        <img src={currentIcon} className="h-12 w-12 bg-kau-primary/25 rounded-md mr-2" />
      )}
      <div className="flex flex-col">
        <p className="mb-2 text-gray-600 font-bold">고양시 화전동</p>
        {isSuccess ? (
          <div className="flex text-xs text-gray-500 space-x-2 font-semibold whitespace-nowrap">
            <p>현재 : {currentTemp.toFixed(1)}°C</p>
            <p>체감 : {perceptionTemp.toFixed(1)}°C</p>
          </div>
        ) : (
          <p className="text-red-400 text-xs font-semibold">연결 상태가 좋지 않습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
