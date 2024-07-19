import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [secs, setSecs] = useState("00");
  const [mins, setMins] = useState("00");
  const [hours, setHours] = useState("00");
  const [startTimer, setStartTimer] = useState(true)
  let interval = null;

  const startCountDown = () => {
    if (secs === "00" && mins == "00" && hours == "00") {
      setStartTimer(false)
      return;
    }

    let secsLeft = parseInt(secs) + parseInt(mins) * 60 + parseInt(hours) * 3600;
    secsLeft = secsLeft - 1;
    // console.log(secsLeft)
    let currHour = Math.floor(secsLeft / 3600);
    if (currHour < 10) currHour = "0" + currHour;
    setHours(currHour);
    secsLeft %= 3600;
    let currMins = Math.floor(secsLeft / 60);
    if (currMins < 10) currMins = "0" + currMins;
    setMins(currMins);
    secsLeft %= 60;
    let currSecs = Math.floor(secsLeft);
    if (currSecs < 10) currSecs = "0" + currSecs;
    setSecs(currSecs);
  };
  useEffect(() => {
    // console.log("tt")
    if (startTimer) {
      interval = setInterval(() => {
        startCountDown();
      },1000);
    }
    return () => { clearInterval(interval) }
  }, [startTimer, secs])

  const triggerCountDown = () => {
    if (secs === "00" && mins == "00" && hours == "00") {
      // console.log("Please enter a value");
      setStartTimer(false)
      return;
    }

    setStartTimer(true)
  };

  return (
    <div className="AppContainer">
      <div className="App">
        <div>
          <input
            value={secs}
            onChange={(e) => {
              setSecs(e.target.value);
            }}
          />
          <h2>Secs</h2>
        </div>
        <div>
          <input
            value={mins}
            onChange={(e) => {
              setMins(e.target.value);
            }}
          />
          <h2>Mins</h2>
        </div>
        <div>
          <input
            value={hours}
            onChange={(e) => {
              setHours(e.target.value);
            }}
          />
          <h2>Hours</h2>
        </div>
      </div>
      <div className="buttonContainer">
        {startTimer == false ?
          <button
            className="start"
            onClick={() => {
              triggerCountDown();
            }}
          >
            Start
          </button>
          : <></>}
        {startTimer == true ?
          <button className="pause" onClick={() => {
            setStartTimer((old) => !old)
          }}>Pause</button> : <></>
        }
        <button className="reset" onClick={() => { setHours("00"); setMins("00"); setSecs("00") }}>Reset</button>
      </div>
    </div>
  );
}

export default App;
