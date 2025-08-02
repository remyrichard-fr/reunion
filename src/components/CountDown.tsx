import { useEffect, useState } from "react";
import { config } from "../config";

type CountdownType = {
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export default function CountDown() {
  const currentDate = new Date();
  const targetDate = new Date(config.date);

  const getDiff = (): CountdownType => {
    const diff = targetDate.getTime() - currentDate.getTime();
    return {
      day: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hour: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minute: Math.floor((diff / (1000 * 60)) % 60),
      second: Math.floor((diff / 1000) % 60),
    };
  };

  const [countdown, setCountdown] = useState<CountdownType>(getDiff());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getDiff());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="countdown">
        <div className="countdown-col">
          <h2>{countdown.day}</h2>
          <h3>Jour{countdown.day > 1 ? "s" : ""}</h3>
        </div>
        <div className="countdown-col">
          <h2>{countdown.hour}</h2>
          <h3>Heure{countdown.hour > 1 ? "s" : ""}</h3>
        </div>
        <div className="countdown-col">
          <h2>{countdown.minute}</h2>
          <h3>Minute{countdown.minute > 1 ? "s" : ""}</h3>
        </div>
        <div className="countdown-col">
          <h2>{countdown.second}</h2>
          <h3>Seconde{countdown.second > 1 ? "s" : ""}</h3>
        </div>
      </div>
    </>
  );
}
