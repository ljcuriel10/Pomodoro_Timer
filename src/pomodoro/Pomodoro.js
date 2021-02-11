import React, { useEffect, useState, useRef } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { secondsToDuration } from "../utils/duration"
import Session from "./Session"
import Break from "./Break"

function Pomodoro() {
  // Timer starts out paused
  const audioElement = useRef(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [ sessionDuration, setSessionDuration ] = useState(1500);
  const [timer, setTimer] = useState(sessionDuration);
  const [breakDuration,setBreakDuration] = useState(300);
  const [currentSession, setCurrentSession] = useState('');
  const [count, setCount] = useState(0)

  const breakSession = `On Break for ${secondsToDuration(breakDuration)} minutes`;
  const focusSession = `Focusing for ${secondsToDuration(sessionDuration)} minutes`;

  useEffect(() => {
    setTimer(sessionDuration)
    setCurrentSession(focusSession)
    
  }, [focusSession, sessionDuration])
  
  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
      setCount(count + .0675)
      setTimer(prevTime => {
        const newTime = prevTime - 1;
        if(newTime >= 0){
          return prevTime - 1
        }
        audioElement.current.play()
        if(currentSession === breakSession) {
          setCurrentSession(focusSession);
          setTimer(sessionDuration)
          
        }else if(currentSession === focusSession){
          setCurrentSession(breakSession);
          setTimer(breakDuration)
          setCount(0 + 15);
        }
      })
      
    },
    
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setIsTimerRunning((prevState) => !prevState);
  }
 function stop(){
  setIsTimerRunning(false);
  setSessionDuration(1500)
  setBreakDuration(300)
  setTimer(1500)
  audioElement.current.load()
 }
 
 
 


  return (
    <div className="pomodoro">
      <Session 
        sessionDuration={sessionDuration} setSessionDuration={setSessionDuration}
      />
      <Break
        breakDuration={breakDuration} setBreakDuration={setBreakDuration}
       />
       <audio id='beep' ref={audioElement}>
         <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"/>
       </audio>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
              onClick={ stop }
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title"> { currentSession }</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              {secondsToDuration(timer)} remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax={setSessionDuration}
                aria-valuenow= {count} // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: `${count}%` }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
