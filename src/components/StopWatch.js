import React, { useState } from 'react'

export default function StopWatch() {
    
    const [ time, setTime ] = useState({
        h:0,
        m:0,
        s:0
    });
    const [ interv, setInterv ] = useState();
    const [ active, setActive ] = useState(false);

    const { h, m, s } = time;

    const startAndPause = (status) => {
        if (status === false) {
            run();
            setInterv(setInterval(run, 1000));
            setActive(true);
        } else {
            setActive(false);
            clearInterval(interv);
        }
    }

    let updatedS = s;
    let updatedM = m;
    let updatedH = h;

    const run = () => {
        if (updatedS < 60) {
            updatedS++;
        }
        if (updatedS === 60) {
            updatedS = 0;
            updatedM++;
        }
        if (updatedM === 60) {
            updatedM = 0;
            updatedH++;
        }
        return setTime({...time, h:updatedH, m:updatedM, s:updatedS});
    }

    const pause = () => {
        clearInterval(interv);
    }

    const reset = () => {
        clearInterval(interv);
        setTime({h:0,m:0,s:0});
        setActive(false);
    }

    return (
        <div className="card">
            <div className="card-header bg-primary text-center text-white">
                <h1 className="display-4">Magic Stopwatch</h1>
            </div>
            <div className="card-body mx-auto">
                <div className="row">
                    <div className="col-4" style={{ paddingRight:'10px'}}>
                        <label><h4 className="display-4 text-center">HH</h4></label>
                        <div style={{ width: '100px', height: '100px', border:'1px solid rgba(0, 0, 0, 0.1)', padding:'5px'}}>
                            <h1 className="display-3">{h < 10 ? `0${h}` : h}</h1>
                        </div>
                    </div>

                    <div className="col-4" style={{ paddingRight:'10px'}}>
                        <label><h4 className="display-4 text-center">MM</h4></label>
                        <div style={{ width: '100px', height: '100px', border:'1px solid rgba(0, 0, 0, 0.1)', padding:'5px'}}>
                            <h1 className="display-3">{m < 10 ? `0${m}` : m}</h1>
                        </div>
                    </div>

                    <div className="col-4">
                        <label><h4 className="display-4 text-center">SS</h4></label>
                        <div style={{ width: '100px', height: '100px', border:'1px solid rgba(0, 0, 0, 0.1)', padding:'5px'}}>
                            <h1 className="display-3">{s < 10 ? `0${s}` : s}</h1>
                        </div>
                    </div>
                </div>
                <div className="row mt-3 mx-auto">
                    <button className="btn btn-success mr-4" onClick={() => startAndPause(active)}>
                        <i className="fas fa-play" style={{ paddingRight:'5px' }}></i>/<i className="fas fa-pause" style={{ paddingLeft:'5px' }}></i>
                    </button>
                    <button className="btn btn-danger" onClick={reset}>
                        <i className="fas fa-stop"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
