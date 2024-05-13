import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { timerActions } from "../../store/timerSlice";
import { FaPlay } from "react-icons/fa6";
import { FaPause } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const TimerActions = ({
  resetTimer,
  isPause,
  playHandler,
  pauseHandler,
  time,
}) => {
  const dispatch = useDispatch();

  const [showTimeChanger, setShowTimeChanger] = useState(false);
  const [days, setDays] = useState(Math.floor(time / (60 * 60 * 24)));
  const [hours, setHours] = useState(
    Math.floor((time - days * 60 * 60 * 24) / (60 * 60))
  );
  const [minutes, setMinutes] = useState(
    Math.floor((time - days * 60 * 60 * 24 - hours * 60 * 60) / 60)
  );
  const [seconds, setSeconds] = useState(
    time - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60
  );

  const daysRef = useRef();
  const hoursRef = useRef();
  const minutesRef = useRef();
  const secondsRef = useRef();

  const changeTimeLimitHandler = () => {
    setShowTimeChanger((prevState) => !prevState);
  };

  const daysChangeHandler = () => {
    setDays(daysRef.current.value);
  };
  const hoursChangeHandler = () => {
    setHours(hoursRef.current.value);
  };
  const minutesChangeHandler = () => {
    setMinutes(minutesRef.current.value);
  };
  const secondsChangeHandler = () => {
    setSeconds(secondsRef.current.value);
  };

  const setTimeHandler = (event) => {
    event.preventDefault();
    const time =
      Number(days * 60 * 60 * 24) +
      Number(hours * 60 * 60) +
      Number(minutes * 60) +
      Number(seconds);
    dispatch(timerActions.setTime(time));
    setShowTimeChanger(false);
  };

  return (
    <div className="text-center">
      <div>
        {isPause ? (
          <button
            className="md:text-5xl text-2xl md:m-4 m-2 p-1 bg-green-700 text-white rounded"
            onClick={playHandler}
          >
            <FaPlay />
          </button>
        ) : (
          <button
            className="md:text-5xl text-2xl md:m-4 m-2 p-1 bg-red-700 text-white rounded"
            onClick={pauseHandler}
          >
            <FaPause />
          </button>
        )}
      </div>
      <div>
        <button
          className="md:text-5xl text-2xl md:m-4 m-2 p-1 bg-yellow-700 text-white rounded"
          onClick={resetTimer}
        >
          <GrPowerReset />
        </button>
      </div>
      <div>
        {showTimeChanger && (
          <div>
            <form onSubmit={setTimeHandler}>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Days"
                ref={daysRef}
                value={days}
                onChange={daysChangeHandler}
                className="md:text-5xl text-2xl md:m-4 m-2 p-1 md:w-[150px] w-[75px]"
                required
              />
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Hours"
                ref={hoursRef}
                value={hours}
                onChange={hoursChangeHandler}
                className="md:text-5xl text-2xl md:m-4 m-2 p-1 md:w-[150px] w-[75px]"
                required
              />
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Minutes"
                ref={minutesRef}
                value={minutes}
                onChange={minutesChangeHandler}
                className="md:text-5xl text-2xl md:m-4 m-2 p-1 md:w-[150px] w-[75px]"
                required
              />
              <input
                type="number"
                min="0"
                step="1"
                placeholder="Seconds"
                ref={secondsRef}
                value={seconds}
                onChange={secondsChangeHandler}
                className="md:text-5xl text-2xl md:m-4 m-2 p-1 md:w-[150px] w-[75px]"
                required
              />
              <button
                className="md:text-5xl text-2xl md:m-4 m-2 p-1 bg-violet-700 text-white rounded"
                type="submit"
              >
                Set New Time
              </button>
            </form>
          </div>
        )}
        <button
          className="md:text-5xl text-2xl md:m-4 m-2 p-1 bg-cyan-700 text-white rounded"
          onClick={changeTimeLimitHandler}
        >
          {showTimeChanger ? "Cancel Time Change" : "Change Time Limit"}
        </button>
      </div>
    </div>
  );
};

export default TimerActions;
