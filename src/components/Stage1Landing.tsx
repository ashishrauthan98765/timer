import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Stage1LandingProps {
  onInitialize: () => void;
}

export default function Stage1Landing({ onInitialize }: Stage1LandingProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 flex items-center justify-center min-h-screen"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        <motion.button
          layoutId="main-button"
          onClick={onInitialize}
          className="relative px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl overflow-hidden group"
          whileHover={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}
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
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 pointer-events-none"
            transition={{ duration: 0.3 }}
          />

          <span className="relative flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            INITIALIZE SEQUENCE
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          </span>

          <motion.div
            className="absolute inset-0 bg-white pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>

        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-cyan-400 pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
