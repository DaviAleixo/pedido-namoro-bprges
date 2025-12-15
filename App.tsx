import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppScreen } from './types';
import { PHOTOS, TEXTS, INTRO_PHOTOS } from './constants';
import MusicPlayer from './components/MusicPlayer';
import Button from './components/Button';
import HeartBackground from './components/HeartBackground';
import Confetti from 'react-confetti';
import { Heart } from 'lucide-react';

// Simple hook to get window size for confetti
const useWindowSizeHook = () => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  React.useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
};

// Funny messages for mobile interactions
const FUNNY_MESSAGES = [
  "Tenta de novo 😜", 
  "Ops... não vai rolar 🚫", 
  "Você não tem escolha! 😈", 
  "Esse botão tá quebrado 🤡", 
  "Clicou errado, amor? 🤔",
  "O botão 'Sim' é o outro 👉"
];

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.START);
  const { width, height } = useWindowSizeHook();
  
  // State for the "No" button logic
  const [noBtnPosition, setNoBtnPosition] = useState<{ x: number; y: number } | null>(null);
  const [escapeSpeed, setEscapeSpeed] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  
  // State for mobile feedback (Toast & Shake)
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [shakeKey, setShakeKey] = useState(0); // Used to trigger re-animation
  
  // State for carousel
  const [introPhotoIndex, setIntroPhotoIndex] = useState(0);

  // Detect Mobile/Touch device
  useEffect(() => {
    const checkMobile = () => {
      const hasTouch = window.matchMedia('(pointer: coarse)').matches;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(hasTouch || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Carousel auto-play effect
  useEffect(() => {
    if (screen === AppScreen.INTRO) {
      const interval = setInterval(() => {
        setIntroPhotoIndex((prev) => (prev + 1) % INTRO_PHOTOS.length);
      }, 3500); 
      return () => clearInterval(interval);
    }
  }, [screen]);

  // Handle "No" interaction
  const handleNoInteraction = () => {
    if (isMobile) {
      // Mobile Logic: Vibrate, Message, Shake
      if (navigator.vibrate) {
        navigator.vibrate(100);
      }

      // Pick random message
      const randomMsg = FUNNY_MESSAGES[Math.floor(Math.random() * FUNNY_MESSAGES.length)];
      setToastMessage(randomMsg);
      
      // Trigger shake animation
      setShakeKey(prev => prev + 1);

      // Clear message after 2 seconds
      setTimeout(() => setToastMessage(null), 2000);
    } else {
      // Desktop Logic: Escape immediately on click if they somehow managed to click it
      handleEscape();
    }
  };

  const handleEscape = () => {
    // Only escape if NOT mobile
    if (isMobile) return;

    const newSpeed = escapeSpeed + 0.5;
    setEscapeSpeed(newSpeed);

    const maxX = window.innerWidth - 150; 
    const maxY = window.innerHeight - 80;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    setNoBtnPosition({ x: randomX, y: randomY });
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-romantic-50 font-sans text-gray-800 relative overflow-hidden flex flex-col">
      {/* Music Player - Visible ONLY after the START screen */}
      <AnimatePresence>
        {screen !== AppScreen.START && (
          <motion.div
            key="music-player"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 w-full z-50 pointer-events-auto"
          >
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>

      <HeartBackground />

      {/* Mobile Toast Message */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-[60] bg-romantic-600 text-white px-6 py-3 rounded-full shadow-lg font-bold text-center whitespace-nowrap"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {screen === AppScreen.SUCCESS && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <Confetti width={width} height={height} numberOfPieces={200} gravity={0.1} />
        </div>
      )}

      <main className="flex-grow flex items-center justify-center p-6 pt-32 z-10">
        <AnimatePresence mode="wait">
          
          {/* START SCREEN */}
          {screen === AppScreen.START && (
            <motion.div
              key="start"
              {...pageTransition}
              className="text-center max-w-lg w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-romantic-200"
            >
              {/* Increased height to accommodate portrait/collage photos better */}
              <div className="relative w-full h-80 md:h-96 mb-8 rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={PHOTOS.start} 
                  alt="Capa Inicial" 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-romantic-900/40 to-transparent"></div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-romantic-600 mb-4 drop-shadow-sm">
                {TEXTS.start.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
                {TEXTS.start.subtitle}
              </p>
              <Button onClick={() => setScreen(AppScreen.INTRO)}>
                {TEXTS.start.button}
              </Button>
            </motion.div>
          )}

          {/* INTRO SCREEN - NOW WITH CAROUSEL */}
          {screen === AppScreen.INTRO && (
            <motion.div
              key="intro"
              {...pageTransition}
              className="text-center max-w-lg w-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-romantic-200"
            >
               <div className="relative w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden shadow-lg group bg-romantic-100">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={introPhotoIndex}
                    src={INTRO_PHOTOS[introPhotoIndex]} 
                    alt="Our memories" 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                </AnimatePresence>
                
                {/* Carousel Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {INTRO_PHOTOS.map((_, index) => (
                    <div 
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === introPhotoIndex ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4 mb-8 text-left md:text-center text-lg text-gray-700 leading-relaxed">
                <p>{TEXTS.intro.paragraph1}</p>
                <p>{TEXTS.intro.paragraph2}</p>
              </div>
              <Button onClick={() => setScreen(AppScreen.QUESTION)}>
                {TEXTS.intro.button}
              </Button>
            </motion.div>
          )}

          {/* QUESTION SCREEN */}
          {screen === AppScreen.QUESTION && (
            <motion.div
              key="question"
              {...pageTransition}
              className="text-center max-w-2xl w-full bg-white/90 backdrop-blur-lg p-6 md:p-10 rounded-3xl shadow-2xl border-2 border-romantic-300 relative min-h-[500px] flex flex-col items-center justify-center"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 mb-6 rounded-full overflow-hidden shadow-xl border-4 border-white mx-auto">
                <img 
                  src={PHOTOS.question} 
                  alt="Question" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-romantic-700 mb-10 leading-tight">
                {TEXTS.question.main}
              </h2>

              <div className="flex flex-col md:flex-row gap-6 items-center justify-center w-full relative h-32 md:h-auto">
                {/* YES Button */}
                <Button 
                  onClick={() => setScreen(AppScreen.SUCCESS)} 
                  className="z-20 min-w-[140px] text-xl py-4"
                >
                  Sim ❤️
                </Button>

                {/* NO Button */}
                <motion.button
                  id="no-btn"
                  key={`no-btn-${shakeKey}`} // Key change triggers animation reset
                  onMouseEnter={handleEscape}
                  onClick={handleNoInteraction}
                  
                  // Animation Logic
                  animate={
                    isMobile 
                      ? { x: [0, -10, 10, -10, 10, 0] } // Shake on mobile
                      : noBtnPosition // Run away on desktop
                        ? { 
                            x: noBtnPosition.x - (window.innerWidth / 2) + 75,
                            y: noBtnPosition.y - (window.innerHeight / 2),
                            position: 'fixed',
                            left: '50%',
                            top: '50%'
                          } 
                        : {}
                  }
                  transition={
                    isMobile 
                      ? { duration: 0.4 } // Fast shake
                      : { type: 'spring', stiffness: 300, damping: 20 } // Smooth run
                  }
                  className={`px-8 py-3 rounded-full font-semibold text-lg shadow-lg transition-colors z-10 min-w-[140px] ${
                    isMobile 
                      ? "bg-romantic-100 text-romantic-600 border-2 border-romantic-200 active:scale-95" // Mobile style
                      : "bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-not-allowed" // Desktop style
                  }`}
                >
                  Não 😢
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS SCREEN */}
          {screen === AppScreen.SUCCESS && (
            <motion.div
              key="success"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className="text-center max-w-lg w-full bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-romantic-400"
            >
              <motion.div 
                className="w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden shadow-lg mx-auto relative"
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              >
                <img 
                  src={PHOTOS.success} 
                  alt="Success" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2 rounded-lg">
                  <Heart className="text-romantic-600 w-8 h-8 fill-current animate-pulse" />
                </div>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-romantic-600 mb-4">
                {TEXTS.success.main}
              </h1>
              <p className="text-xl text-gray-700 font-medium">
                {TEXTS.success.sub}
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="text-center py-4 text-romantic-300 text-sm z-10">
        Feito com muito amor ❤️
      </footer>
    </div>
  );
};

export default App;