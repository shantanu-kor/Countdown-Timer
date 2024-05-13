import React, { useEffect, useState } from "react";
import TimerDisplay from "./timer/TimerDisplay";
import TImerActions from "./timer/TimerActions";
import { useSelector } from "react-redux";
import { Progress } from "flowbite-react";

const Timer = () => {
  // get the time from redux
  const time = useSelector((state) => state.timer.time);
  
  // handle the value of displayed time
  const [timerTime, setTimerTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // handle the values of timeup, running setInterval's id, and pause state
  const [timeUp, setTimeUp] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [isPause, setIsPause] = useState(false);

  // set the value of time from seconds to days, hours, minutes, and seconds format
  const setTimerValue = (time) => {
    const days = Math.floor(time / (60 * 60 * 24));
    const hours = Math.floor((time - days * 60 * 60 * 24) / (60 * 60));
    const minutes = Math.floor(
      (time - days * 60 * 60 * 24 - hours * 60 * 60) / 60
    );
    const seconds = time - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;
    setTimerTime({ days, hours, minutes, seconds });
  };

  // run every time the value of countdown time changes
  useEffect(() => {
    // console.log(time)
    setTimerValue(time);
    clearInterval(intervalId);
    setIsPause(false);
    setTimeUp(false);
  }, [time]);

  // stop the countdown after timeup
  useEffect(() => {
    if (timeUp) {
      //   console.log("cleared >>>", intervalId);
      clearInterval(intervalId);
    }
  }, [timeUp]);

  // start the countdown if there is time left or not paused
  useEffect(() => {
    // console.log(timeUp, isPause);
    if (!timeUp && !isPause) {
      const id = setInterval(() => {
        setTimerTime((prevState) => {
          let time =
            prevState.days * 60 * 60 * 24 +
            prevState.hours * 60 * 60 +
            prevState.minutes * 60 +
            prevState.seconds;
          time = time - 1;
        //   console.log(time);
          if (time === 0) {
            setTimeUp(true);
          }
          const days = Math.floor(time / (60 * 60 * 24));
          const hours = Math.floor((time - days * 60 * 60 * 24) / (60 * 60));
          const minutes = Math.floor(
            (time - days * 60 * 60 * 24 - hours * 60 * 60) / 60
          );
          const seconds =
            time - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;
          return { days, hours, minutes, seconds };
        });
      }, 1000);
      setIntervalId(id);
      //   console.log(id);
    }
  }, [timeUp, isPause, time]);

  // reset the timer in paused state
  const resetTimer = () => {
    // console.log(intervalId); 
    setTimerValue(time);
    clearInterval(intervalId);
    setTimeUp(false);
    setIsPause(true);
  };

  // start the timer from paused state
  const playHandler = () => {
    setIsPause(false);
  };

  // pause the timer from play state
  const pauseHandler = () => {
    clearInterval(intervalId);
    setIsPause(true);
  };

  return (
    <>
      <TimerDisplay time={timerTime} timeUp={timeUp} />
      <Progress
        progress={
          (1 -
            ((timerTime.days * 60 * 60 * 24 +
              timerTime.hours * 60 * 60 +
              timerTime.minutes * 60 +
              timerTime.seconds) / time)) *
          100
        }
        size="sm"
        className="md:my-14 my-7"
      />
      <TImerActions
        resetTimer={resetTimer}
        isPause={isPause}
        pauseHandler={pauseHandler}
        playHandler={playHandler}
        time={time}
      />
    </>
  );
};

export default Timer;
