import React, { useEffect, useState } from "react";
import '../Style/Clock.css';

const Clock = () => {
    const [day, setDay] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDay(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const hourHandStyle = {
        width: '4px',
        height: '80px',
        background: '#292a2e',
        position: 'absolute',
        borderRadius: '6px 6px 0 0',
        transform: `rotate(${(day.getHours() % 12 + day.getMinutes() / 60) * 30}deg)`,
        transformOrigin: '0px bottom',
        left: '50%',
        bottom: '50%',
        zIndex: "1000"
    };


    const secondHandStyle = {
        width: '3px',
        height: '110px',
        background: '#dda751',
        position: 'absolute',
        bottom: '50%',
        borderRadius: '6px 6px 0 0',
        transform: `rotate(${day.getSeconds() * 6}deg)`,
        transformOrigin: '0px bottom',
        left: '50%',
        justifyContent: "center",
        animation: 'rotateSecondHand 60s linear infinite',
        zIndex: "1000"
    };

    const numberStyle = {
        color: '#b6b1a6',
        fontWeight: 'bold',
        fontSize: '1.5rem',
        position: 'absolute',
        width: '70%',
        height: '70%',
        textAlign: 'center',
        zIndex: "1000"
    };

    return (
      <>
        <div
          style={{ position: "relative" }}
          className="clock-container d-flex justify-content-center align-items-center"
        >
          <div className="center-border d-flex justify-content-center align-items-center">
            <div style={hourHandStyle} className="hour-hand"></div>
            <div style={secondHandStyle} className="second-hand"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((number) => (
              <div
                key={number}
                style={{
                  ...numberStyle,
                  transform: `rotate(${number * 30}deg)`,
                }}
              >
                <p>{number}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
};

export default Clock;

