import React from 'react';
import { minutesToDuration, secondsToDuration } from '../utils/duration'

export default function Session(props){
   const  {sessionDuration, setSessionDuration} = props
   const minusHandler = () => {
    const newTime = sessionDuration - 300;
    if(newTime < 0){
      setSessionDuration(300);
    } else{
      setSessionDuration(newTime);
    };
  };

  const plusHandler = () => {
    const newTime = sessionDuration + 300
    if( newTime > 3600){
      setSessionDuration(3600)
    } else{
      setSessionDuration(newTime);
    }
  }

    return (
        
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {(sessionDuration=== 3600) ? minutesToDuration(60) : secondsToDuration(sessionDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick = {minusHandler}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={plusHandler}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
       
    )
}