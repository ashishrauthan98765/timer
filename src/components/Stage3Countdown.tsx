import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Stage3CountdownProps {
  targetDate: Date;
  onComplete: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export default function Stage3Countdown({ targetDate, onComplete }: Stage3CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const total = targetDate.getTime() - new Date().getTime();

    if (total <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds, total };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [targetDate, onComplete]);

  const heartbeat = timeLeft.seconds % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 flex items-center justify-center min-h-screen px-4"
    >
      <motion.div
        animate={{
          scale: heartbeat ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <motion.div
          className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <TimeUnit value={timeLeft.days} label="DAYS" />
          <TimeUnit value={timeLeft.hours} label="HOURS" />
          <TimeUnit value={timeLeft.minutes} label="MINUTES" />
          <TimeUnit value={timeLeft.seconds} label="SECONDS" />
        </div>
      </motion.div>
    </motion.div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 15, stiffness: 200 }}
      className="relative flex flex-col items-center gap-3"
    >
      <div className="relative backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl p-4 md:p-6 min-w-[100px] md:min-w-[140px]">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
          animate={{
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative overflow-hidden h-20 md:h-24 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={value}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl md:text-7xl font-bold tabular-nums bg-gradient-to-br from-cyan-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent"
              style={{
                fontFamily: 'monospace',
                textShadow: '0 0 30px rgba(6, 182, 212, 0.5)',
              }}
            >
              {value.toString().padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="text-xs md:text-sm font-bold tracking-widest text-cyan-300"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}
