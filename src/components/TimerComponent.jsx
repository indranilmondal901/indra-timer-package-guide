import React, { useState } from 'react';
import Timer from 'indra-timer';

function TimerComponent() {
  const [timer, setTimer] = useState(new Timer());
  const [remainingTime, setRemainingTime] = useState(timer.calculateRemainingTime());
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const handleStartTimer = () => {
    // Start the timer with user input
    timer.start(inputHours, inputMinutes, inputSeconds);

    // Log the remaining time every second
    const id = setInterval(() => {
      const timeRemaining = timer.calculateRemainingTime();
      setRemainingTime(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(id);
        console.log('Timer completed!');
      }
    }, 1000);

    setIntervalId(id);
  };

  const handlePauseTimer = () => {
    timer.pause();
    clearInterval(intervalId);
  };

  const handleResumeTimer = () => {
    // Resume the timer with the remaining time
    timer.resume();
    
    // Log the remaining time every second
    const id = setInterval(() => {
      const timeRemaining = timer.calculateRemainingTime();
      setRemainingTime(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(id);
        console.log('Timer completed!');
      }
    }, 1000);

    setIntervalId(id);
  };

  const handleStopTimer = () => {
    timer.stop();
    clearInterval(intervalId);
    setRemainingTime(0);
    setInputHours(0);
    setInputMinutes(0);
    setInputSeconds(0);
  };

  return (
    <div id="wrapper">
      <div>
        <label>Hours: </label>
        <input type="number" min="0" value={inputHours} onChange={(e) => setInputHours(parseInt(e.target.value, 10))} />
      </div>
      <div>
        <label>Minutes: </label>
        <input type="number" min="0" value={inputMinutes} onChange={(e) => setInputMinutes(parseInt(e.target.value, 10))} />
      </div>
      <div>
        <label>Seconds: </label>
        <input type="number" min="0" value={inputSeconds} onChange={(e) => setInputSeconds(parseInt(e.target.value, 10))} />
      </div>

      <button onClick={handleStartTimer}>Start</button>
      <button onClick={handlePauseTimer}>Pause</button>
      <button onClick={handleResumeTimer}>Resume</button>
      <button onClick={handleStopTimer}>Stop</button>

      <p>Remaining Time: {timer.formatTime(remainingTime)}</p>
    </div>
  );
}

export default TimerComponent;
