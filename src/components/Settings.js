import React from "react";

function Settings({ workDuration, breakDuration, setWorkDuration, setBreakDuration }) {
  return (
    <div className="settings">
      <div className="setting-item">
        <label>🏋️ Work Duration (mins):</label>
        <input type="number" value={workDuration} onChange={(e) => setWorkDuration(Number(e.target.value))} />
      </div>
      <div className="setting-item">
        <label>☕ Break Duration (mins):</label>
        <input type="number" value={breakDuration} onChange={(e) => setBreakDuration(Number(e.target.value))} />
      </div>
    </div>
  );
}

export default Settings;
