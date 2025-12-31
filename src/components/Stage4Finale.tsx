import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useState } from 'react';
import { loadFireworksPreset } from '@tsparticles/preset-fireworks';
import type { Engine } from '@tsparticles/engine';

interface Stage4FinaleProps {
  onReset: () => void;
}

export default function Stage4Finale({ onReset }: Stage4FinaleProps) {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFireworksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const text = 'HAPPY NEW YEAR!';
  const letters = text.split('');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative z-10 flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      <motion.div
        initial={{ scale: 10, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-white"
      />

      {init && (
        <Particles
          id="tsparticles"
          options={{
            preset: 'fireworks',
            background: {
              color: 'transparent',
            },
            fullScreen: {
              enable: true,
              zIndex: 0,
            },
          }}
        />
      )}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', damping: 10, stiffness: 100 }}
        className="relative z-20 px-4"
      >
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: -200, opacity: 0, rotate: -180 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: 'spring',
                  damping: 12,
                  stiffness: 200,
                }}
                className="text-5xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent"
                style={{
                  textShadow: '0 0 40px rgba(251, 191, 36, 0.8)',
                  fontFamily: 'monospace',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
            className="space-y-4"
          >
            <motion.div
              className="text-xl md:text-3xl text-cyan-300 font-semibold"
              animate={{
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Celebrate the New Beginning!
            </motion.div>

            <motion.button
              onClick={onReset}
              className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.4)',
                  '0 0 40px rgba(6, 182, 212, 0.6)',
                  '0 0 20px rgba(6, 182, 212, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                START NEW COUNTDOWN
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.5, times: [0, 0.5, 1] }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 via-transparent to-transparent" />
      </motion.div>
    </motion.div>
  );
}
