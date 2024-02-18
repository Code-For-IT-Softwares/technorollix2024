"use client";
import React, { useEffect, useState } from "react";
function Countdown() {
  const [day1, setDay1] = useState(0);
  const [hour1, setHour1] = useState(0);
  const [min1, setMin1] = useState(0);
  const [second1, setSecond1] = useState(0);
  const [day2, setDay2] = useState(0);
  const [hour2, setHour2] = useState(0);
  const [min2, setMin2] = useState(0);
  const [second2, setSecond2] = useState(0);

  useEffect(() => {
    const targetTime = new Date("March 20,2024 00:00:00").getTime();

    setInterval(() => {
      const currentTime = new Date().getTime();
      const diff = targetTime - currentTime;
      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hour = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((diff % (1000 * 60)) / 1000);

      const arr_day = day.toString().split("");
      const arr_hour = hour.toString().split("");
      const arr_min = min.toString().split("");
      const arr_second = second.toString().split("");

      if (diff > 0) {
        setDay1(arr_day[0]);
        setHour1(arr_hour[0]);
        setMin1(arr_min[0]);
        setSecond1(arr_second[0]);
        setDay2(arr_day[1]);
        setHour2(arr_hour[1]);
        setMin2(arr_min[1]);
        setSecond2(arr_second[1]);
      }
    }, 1000);
  }, []);

  return (
    <div className="flex text-3xlxl  w-auto h-24 rounded-md  mb-7  ">
      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {day1}
      </span>
      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {day2}
      </span>
      <div className="text-center flex items-center text-6xl  ">:</div>

      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {hour1}
      </span>
      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {hour2}
      </span>
      <div className="text-center flex items-center text-6xl ">:</div>

      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {min1}
      </span>
      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {min2}
      </span>
      <div className="text-center flex items-center text-6xl ">:</div>

      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {second1}
      </span>
      <span className="bg-gray-500 p-4 m-2 rounded-md flex items-center text-6xl">
        {second2}
      </span>
    </div>
  );
}

export default Countdown;