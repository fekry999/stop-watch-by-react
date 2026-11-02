import { useState, useEffect } from 'react';

function formatTime(ms) {
  const minutes = ('0' + Math.floor((ms / 60000) % 60)).slice(-2);
  const seconds = ('0' + Math.floor((ms / 1000) % 60)).slice(-2);
  const centis  = ('0' + Math.floor((ms / 10) % 100)).slice(-2);
  return `${minutes}:${seconds}:${centis}`;
}

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTime(prev => prev + 10);
    }, 10);
    return () => clearInterval(interval);
  }, [running]);

  function handleLap() {
    setLaps(prev => [...prev, time]);
  }

  function handleReset() {
    setTime(0);
    setLaps([]);
    setRunning(false);
  }

  return (
    <div className="App">
      <div>{formatTime(time)}</div>
      <div>
        {running
          ? <button onClick={() => setRunning(false)}>Pause</button>
          : <button onClick={() => setRunning(true)}>Start</button>}
        {running && <button onClick={handleLap}>Lap</button>}
        <button onClick={handleReset}>Reset</button>
      </div>
      <h4>Laps</h4>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>{formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;