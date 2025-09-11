import React, { useState, useEffect } from "react";

export default function CountdownTimer({ onTimeOut }) {
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeOut();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}
