import { useState, useEffect } from "react";

export const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const currentYear = now.getFullYear();

            // Get Valentine's Day (February 14th at 12am) for the current year
            let valentinesDay = new Date(currentYear, 1, 14, 0, 0, 0, 0); // Month is 0-indexed, so 1 = February

            // If Valentine's Day has already passed this year, use next year
            if (now > valentinesDay) {
                valentinesDay = new Date(currentYear + 1, 1, 14, 0, 0, 0, 0);
            }

            const difference = valentinesDay.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Calculate immediately
        calculateTimeLeft();

        // Update every second
        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center mb-4">
            <div className="text-sm font-semibold mb-1">Countdown to Valentine's Day</div>
            <div className="text-lg font-bold">
                {String(timeLeft.days).padStart(2, "0")}:
                {String(timeLeft.hours).padStart(2, "0")}:
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
            </div>
        </div>
    );
};

