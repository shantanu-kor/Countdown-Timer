import React from "react";

const TimerDisplay = ({ time, timeUp }) => {
  return (
    <div className="text-center md:text-4xl text-2xl md:m-14 m-7 mx-auto bg-blue-900 text-white md:p-4 p-2 rounded-md">
      {timeUp ? (
        <span>Time has Ended</span>
      ) : (
        <div>
          <span>{time.days} Days</span> : <span>{time.hours} Hours</span> :{" "}
          <span>{time.minutes} Minutes</span> :{" "}
          <span>{time.seconds} Seconds</span>
        </div>
      )}
    </div>
  );
};

export default TimerDisplay;
