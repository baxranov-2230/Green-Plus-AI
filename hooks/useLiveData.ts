import { useState, useEffect } from 'react';
import { SENSORS } from '../constants';
import { Sensor } from '../types';

const getNoisyValue = (current: number, type: string) => {
  const noise = (Math.random() - 0.5) * (current * 0.05);
  let newValue = current + noise;
  if (type === 'air' && newValue < 0) newValue = 2;
  if (type === 'water' && newValue < 0) newValue = 10;
  return parseFloat(newValue.toFixed(2));
};

export const useLiveData = (isLive: boolean) => {
  const [liveSensors, setLiveSensors] = useState<Sensor[]>(SENSORS);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [history, setHistory] = useState<{time: string, val: number}[]>(() => 
    Array.from({ length: 20 }).map((_, i) => ({
      time: new Date(Date.now() - (20 - i) * 5000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      val: 25 + Math.random() * 15
    }))
  );

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLiveSensors(prev => prev.map(s => ({
        ...s,
        value: getNoisyValue(s.value, s.type),
        status: Math.random() > 0.98 ? (s.status === 'normal' ? 'warning' : 'normal') : s.status
      })));

      setLastUpdate(new Date());

      setHistory(prev => {
        const newPoint = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          val: (prev[prev.length - 1].val + (Math.random() - 0.5) * 5)
        };
        return [...prev.slice(1), newPoint];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  return { liveSensors, lastUpdate, history };
};