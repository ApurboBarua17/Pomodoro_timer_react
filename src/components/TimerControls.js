import React from "react";

function TimerControls({ timeRemaining, isRunning, setIsRunning, setTimeRemaining, workDuration }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-display">
      <h2>{isRunning ? "💻 Work Mode" : "🎮 Break Time!"}</h2>
      <div className="time pixel-font">{formatTime(timeRemaining)}</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "⏸️ Pause" : "▶️ Start"}
      </button>
      <button onClick={() => setTimeRemaining(workDuration * 60)}>🔄 Reset</button>
    </div>
  );
}

export default TimerControls;
