import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Race } from "@shared/schema";

const NextRaceCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const { data: nextRace, isLoading } = useQuery<Race & {track?: any}>({
    queryKey: ['/api/races/next'],
  });

  useEffect(() => {
    if (!nextRace) return;

    const calculateTimeLeft = () => {
      const difference = new Date(nextRace.date).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  if (isLoading || !nextRace) {
    return (
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center">
            <p>Loading next race information...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <span className="text-sm font-medium uppercase">Next Race</span>
            <h2 className="text-2xl font-heading font-bold">{nextRace.name}</h2>
            <p className="text-gray-200">{nextRace.track ? `${nextRace.track.name}, ${nextRace.track.location}` : 'Location TBA'}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="text-center mr-6">
              <span className="block text-3xl font-racing">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Days</span>
            </div>
            <div className="text-center mr-6">
              <span className="block text-3xl font-racing">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Hours</span>
            </div>
            <div className="text-center mr-6">
              <span className="block text-3xl font-racing">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Minutes</span>
            </div>
            <div className="text-center">
              <span className="block text-3xl font-racing">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-xs uppercase">Seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NextRaceCountdown;
