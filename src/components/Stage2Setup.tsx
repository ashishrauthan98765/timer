import { motion } from 'framer-motion';
import { Calendar, Clock, Rocket } from 'lucide-react';
import { useState } from 'react';

interface Stage2SetupProps {
  onLaunch: (targetDate: Date) => void;
}

export default function Stage2Setup({ onLaunch }: Stage2SetupProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleLaunch = () => {
    if (!date || !time) return;

    const targetDateTime = new Date(`${date}T${time}`);
    if (targetDateTime <= new Date()) {
      alert('Please select a future date and time!');
      return;
    }

    onLaunch(targetDateTime);
  };

  const getDefaultNewYearDateTime = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    setDate(`${nextYear}-01-01`);
    setTime('00:00');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex items-center justify-center min-h-screen px-4"
    >
      <motion.div
        layoutId="main-button"
        className="relative w-full max-w-md"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        <div className="relative backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative space-y-6">
            <motion.h2
              className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Set Target Time
            </motion.h2>

            <motion.div
              className="space-y-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-cyan-300 font-medium">
                  <Calendar className="w-5 h-5" />
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-cyan-300 font-medium">
                  <Clock className="w-5 h-5" />
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition-all"
                />
              </div>

              <motion.button
                onClick={getDefaultNewYearDateTime}
                className="w-full px-4 py-2 text-sm text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Quick Set: New Year's Eve
              </motion.button>
            </motion.div>

            <motion.button
              onClick={handleLaunch}
              disabled={!date || !time}
              className="w-full px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden relative group"
              whileHover={{ scale: date && time ? 1.02 : 1 }}
              whileTap={{ scale: date && time ? 0.98 : 1 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center justify-center gap-2">
                <Rocket className="w-6 h-6" />
                LAUNCH COUNTDOWN
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
