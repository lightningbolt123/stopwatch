import React, { useState, useEffect } from 'react';
import { interval, Subject, fromEvent } from "rxjs";
import { takeUntil, debounceTime, bufferWhen, map, filter, delay } from "rxjs/operators";
import DisplayComponent from './DisplayComponent';
import BtnComponent from './BtnComponent';

function StopWatch() {

  const [time, setTime] = useState(0);
  const [watchOn, setWatchOn] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {

    // Get the button from the dom
    const buttonEl = document.getElementById('butID');

    // Detect a click event from the button
    const click$ = fromEvent(buttonEl,'click');

    // Create a new unsubscription object using the Subject class
    const unsubscribe = new Subject();

    // Chain function for detecting double click
    const doubleClick$ = click$.pipe(takeUntil(unsubscribe)).pipe(bufferWhen(() => click$.pipe(debounceTime(250))))
    .pipe(map(arr => arr.length)).pipe(filter(len => len === 2));

    // Pause and play the stopwatch
    doubleClick$.subscribe(event => setWatchOn(prevCount => !prevCount));

    // Creating a chain function for running the watch 
    interval(10)
        .pipe(takeUntil(unsubscribe))
        .subscribe(() => {
          if (watchOn) {
            setTime(val => val + 1);
          }
        });

    // Unsubscribing from every observable
    return () => {
      unsubscribe.next();
      unsubscribe.complete();
    };
  }, [watchOn, setWatchOn]);

  // Start function
  const handleStart = () => {
    setWatchOn(prevCount => !prevCount);
    setStatus(1);
  }


  // Resume function
  const handleResume = () => {
    handleStart();
  }

  // Stop function
  const handleStop = () => {
    if (time !== 0 && status === 1) {
      setWatchOn(false);
    }
    setTime(0);
    setStatus(2);
  }


  // Reset function
  const handleReset = () => {
    if (status === 1 || time > 0) {
      setTime(0);
      setWatchOn(true);
      setStatus(1);
    }
  }

    return (
      <div className="App">
        <div className='main-section'>
          <div className='clock-holder'>
            <div className='app-title'>Magic Stopwatch</div>
            <div className='stopwatch'>
              <DisplayComponent
                  time={time}
              />
              <BtnComponent
                  start={handleStart}
                  stop={handleStop}
                  reset={handleReset}
                  status={status}
              />
            </div>
          </div>
        </div>
      </div>
    )
};

export default StopWatch;