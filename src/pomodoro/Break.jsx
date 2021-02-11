import React from 'react';
import {secondsToDuration} from '../utils/duration'


export default function Break(props){
    const { breakDuration, setBreakDuration } = props
    const minusDuration = () => {
      const newDuration = breakDuration - 60;
      if(newDuration < 60){
        setBreakDuration(60);
      } else{
        setBreakDuration(newDuration);
      }
    }
  
    const plusDuration = () => {
      const newDuration = breakDuration + 60;
      if(newDuration > 900){
        setBreakDuration(900)
      }else{
        setBreakDuration(newDuration)
      }
    };

    return (
      <div className="row">
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {secondsToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={ minusDuration}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={ plusDuration }
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      
    )
}