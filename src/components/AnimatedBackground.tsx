import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

export default function AnimatedBackground({ intensity = 'low' }: AnimatedBackgroundProps) {
  const getAnimation = () => {
    switch (intensity) {
      case 'low':
        return { scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] };
      case 'medium':
        return { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] };
      case 'high':
        return { scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] };
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
        animate={getAnimation()}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
