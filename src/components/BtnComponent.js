import React from 'react';

function BtnComponent({ start, stop, reset, status }) {
  return (
      <div>
          {status === 0 && (
              <div>
                    <button className="stopwatch-btn stopwatch-btn-grn"
                        onClick={start}>Start</button>
            
                    <button className="stopwatch-btn stopwatch-btn-red"
                            id="butID" type="button">Wait</button>
            
                    <button className="stopwatch-btn stopwatch-btn-yel"
                            onClick={reset}>Reset</button>
                </div>
          )}

            {status === 1 && (
                        <div>
                                <button className="stopwatch-btn stopwatch-btn-red"
                                    onClick={stop}>Stop</button>
                        
                                <button className="stopwatch-btn stopwatch-btn-blu"
                                        id="butID" type="button">Wait</button>
                        
                                <button className="stopwatch-btn stopwatch-btn-yel"
                                        onClick={reset}>Reset</button>
                            </div>
                    )}

                    {status === 2 && (
                                <div>
                                        <button className="stopwatch-btn stopwatch-btn-grn"
                                            onClick={start}>Start</button>
                                
                                        <button className="stopwatch-btn stopwatch-btn-red"
                                                id="butID" type="button">Wait</button>
                                
                                        <button className="stopwatch-btn stopwatch-btn-yel"
                                                onClick={reset}>Reset</button>
                                    </div>
                            )}
      </div>
  );
}

export default BtnComponent;
