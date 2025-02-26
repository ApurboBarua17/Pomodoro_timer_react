import React, { useState, useEffect, useRef } from "react";
import TimerControls from "./TimerControls";
import Settings from "./Settings";

const LOFI_MUSIC = [
  { 
    name: "🎵 Chill Study", 
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artist: "SoundHelix"
  },
  { 
    name: "🌙 Night Vibes", 
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artist: "Lofi Dreams"
  },
  { 
    name: "☁️ Cloudy Lofi", 
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artist: "Chill Lounge"
  }
];

function PomodoroTimer() {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(workDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState(null);
  const musicRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => (prev > 0 ? prev - 1 : workDuration * 60));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning, workDuration]);

  // Handle music playback after user interaction
  useEffect(() => {
    const playMusic = () => {
      if (selectedMusic) {
        musicRef.current.src = selectedMusic.src;
        musicRef.current.loop = true;
        musicRef.current.play().catch(error => console.log("Autoplay blocked:", error));
      } else {
        musicRef.current?.pause();
      }
    };

    document.addEventListener("click", playMusic);

    return () => {
      document.removeEventListener("click", playMusic);
    };
  }, [selectedMusic]);

  return (
    <div className="pomodoro-container">
      <h1>🕹️ Pomodoro 🍅</h1>
      <TimerControls 
        timeRemaining={timeRemaining} 
        isRunning={isRunning} 
        setIsRunning={setIsRunning} 
        setTimeRemaining={setTimeRemaining} 
        workDuration={workDuration}
      />
      <Settings 
        workDuration={workDuration} 
        breakDuration={breakDuration} 
        setWorkDuration={setWorkDuration} 
        setBreakDuration={setBreakDuration} 
      />

      {/* Music Selection */}
      <div className="music-options">
        <h3>🎧 Lofi Music</h3>
        {LOFI_MUSIC.map((music) => (
          <button 
            key={music.name}
            onClick={() => setSelectedMusic(selectedMusic === music ? null : music)}
            className={`music-button ${selectedMusic === music ? 'active' : ''}`}
          >
            {music.name}
          </button>
        ))}
        {selectedMusic && (
          <div className="music-info">
            <p>🎼 Now Playing: {selectedMusic.name}</p>
            <p>🎤 Artist: {selectedMusic.artist}</p>
          </div>
        )}
        <audio ref={musicRef} />
      </div>
    </div>
  );
}

export default PomodoroTimer;
