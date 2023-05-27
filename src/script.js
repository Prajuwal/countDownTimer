/*
 * https://frontendeval.com/questions/countdown-timer
 *
 * Create a countdown timer that notifies the user
 */
const { useState } = React;
const { useEffect } = React;
const App = () => {
    const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pauseRem,setPauseRem] = useState(false)

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setPauseRem(true)
  };

  const resetTimer = () => {
    setHours('');
    setMinutes('');
    setSeconds('');
    setIsRunning(false);
  };

  useEffect(() => {
    let countdownInterval;

    if (isRunning) {
      countdownInterval = setInterval(() => {
        let newHours = parseInt(hours);
        let newMinutes = parseInt(minutes);
        let newSeconds = parseInt(seconds);

        if (isNaN(newHours)) newHours = 0;
        if (isNaN(newMinutes)) newMinutes = 0;
        if (isNaN(newSeconds)) newSeconds = 0;

        if (newHours === 0 && newMinutes === 0 && newSeconds === 0) {
          clearInterval(countdownInterval);
          console.log("Time's Up!");
          setIsRunning(false);
        } else {
          if (newMinutes === 0 && newSeconds === 0) {
            newHours = Math.max(0, newHours - 1);
            newMinutes = 59;
            newSeconds = 59;
          } else if (newSeconds === 0) {
            newMinutes = Math.max(0, newMinutes - 1);
            newSeconds = 59;
          } else {
            newSeconds--;
          }

          setHours(newHours.toString().padStart(2, '0'));
          setMinutes(newMinutes.toString().padStart(2, '0'));
          setSeconds(newSeconds.toString().padStart(2, '0'));
        }
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [hours, minutes, seconds, isRunning]);

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
        <input
          type="number"
          placeholder="Seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </div>
       {isRunning ? (
        <div>
          <button onClick={pauseTimer}>Pause</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      ) : (
        <div>
            {pauseRem && <button onClick={startTimer}>Resume</button>}
          {!pauseRem && <button onClick={startTimer}>Start</button>}
           
          {hours || minutes || seconds ? (
            <button onClick={resetTimer}>Reset</button>
          ) : null}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
