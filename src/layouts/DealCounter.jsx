import React, { useEffect, useState } from "react";
import styles from "../styles/DealCounter.module.css";

const DealCounter = () => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const difference = midnight - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
   
      <div className={styles.dailycount}>
        <img
          src="https://www.boat-lifestyle.com/cdn/shop/files/Strip_Web_7e8d9cac-7c19-4f8a-942b-31ee37358ec3_1400x.jpg?v=1711779751"
          alt=""
        />
        <div className={styles.time}>
          <span>
            <p>Starting in</p>
            {timeLeft.hours.toString().padStart(2, "0")} <p>Hours</p>:
          </span>
          <span>
            {timeLeft.minutes.toString().padStart(2, "0")}
            <p>Minutes</p>:
          </span>
          <span>
            {timeLeft.seconds.toString().padStart(2, "0")}
            <p>Seconds</p>
          </span>
        </div>
      </div>
  );
};

export default DealCounter;
