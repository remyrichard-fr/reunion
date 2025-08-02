import { useEffect, useState } from "react";
import { config } from "../config";

type CountdownType = {
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

export default function CountDown() {
  const targetDate = new Date(config.date);

  const getDiff = (): CountdownType => {
    const now = new Date();

    // Calculer le nombre total de mois entre maintenant et targetDate
    let months =
      (targetDate.getFullYear() - now.getFullYear()) * 12 +
      (targetDate.getMonth() - now.getMonth());

    // Créer une date intermédiaire qui correspond à "now + months"
    const intermediateDate = new Date(now);
    intermediateDate.setMonth(intermediateDate.getMonth() + months);

    let days = 0;
    // Si intermediateDate > targetDate, ça veut dire qu'on a trop ajouté un mois, on corrige
    if (intermediateDate > targetDate) {
      months -= 1;
      intermediateDate.setMonth(intermediateDate.getMonth() - 1);
    }

    // Calculer la différence en jours entre intermediateDate et targetDate
    const diffDays = (targetDate.getTime() - intermediateDate.getTime()) / (1000 * 60 * 60 * 24);
    days = Math.floor(diffDays);

    // Calculer la différence restante en heures, minutes, secondes
    const diffMs = targetDate.getTime() - now.getTime();

    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    return {
      month: months,
      day: days,
      hour: hours,
      minute: minutes,
      second: seconds,
    };
  };

  const [countdown, setCountdown] = useState<CountdownType>(getDiff());

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getDiff());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown">
      <div className="countdown-col">
        <h2>{countdown.month}</h2>
        <h3>Mois</h3>
      </div>
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
  );
}
