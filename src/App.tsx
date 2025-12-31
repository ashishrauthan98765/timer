import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedBackground from './components/AnimatedBackground';
import Stage1Landing from './components/Stage1Landing';
import Stage2Setup from './components/Stage2Setup';
import Stage3Countdown from './components/Stage3Countdown';
import Stage4Finale from './components/Stage4Finale';

type Stage = 'landing' | 'setup' | 'countdown' | 'finale';

function App() {
  const [stage, setStage] = useState<Stage>('landing');
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const handleInitialize = () => {
    setStage('setup');
  };

  const handleLaunch = (date: Date) => {
    setTargetDate(date);
    setStage('countdown');
  };

  const handleComplete = () => {
    setStage('finale');
  };

  const handleReset = () => {
    setStage('landing');
    setTargetDate(null);
  };

  const getBackgroundIntensity = () => {
    switch (stage) {
      case 'landing':
        return 'low';
      case 'setup':
        return 'low';
      case 'countdown':
        return 'medium';
      case 'finale':
        return 'high';
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <AnimatedBackground intensity={getBackgroundIntensity()} />

      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <Stage1Landing key="landing" onInitialize={handleInitialize} />
        )}
        {stage === 'setup' && (
          <Stage2Setup key="setup" onLaunch={handleLaunch} />
        )}
        {stage === 'countdown' && targetDate && (
          <Stage3Countdown key="countdown" targetDate={targetDate} onComplete={handleComplete} />
        )}
        {stage === 'finale' && (
          <Stage4Finale key="finale" onReset={handleReset} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
