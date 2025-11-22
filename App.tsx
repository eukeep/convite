import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle, Beer, Utensils, ArrowRight, ArrowLeft, Star, Loader2, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import AudioPlayer from './components/AudioPlayer';
import { PARTY_INFO, ATTRACTIONS, EXPERIENCES, WHATSAPP_GROUP_LINK, TRANSITION_IMAGES } from './constants';

type Step = 'loading' | 'intro' | 'theme' | 'attractions' | 'food' | 'experiences' | 'location';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('loading');
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for back

  useEffect(() => {
    // Fake loading sequence
    if (currentStep === 'loading') {
      const timer = setTimeout(() => {
        setCurrentStep('intro');
        // Attempt to auto-play music when loading finishes.
        // Note: This might be blocked by browsers if no interaction occurred yet.
        setIsPlaying(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Global listener: The browser likely blocked the initial auto-play.
  // We attach a one-time listener to ANY click/tap on the page to start the music.
  useEffect(() => {
    const handleFirstInteraction = () => {
      // Only force play if the user hasn't manually paused it (though initially it's just false)
      setIsPlaying(true);
    };

    // 'once: true' ensures this listener is removed automatically after the first trigger
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const navigate = (nextStep: Step) => {
    // Determine direction based on step order for animation
    const steps: Step[] = ['loading', 'intro', 'theme', 'attractions', 'food', 'experiences', 'location'];
    const currentIndex = steps.indexOf(currentStep);
    const nextIndex = steps.indexOf(nextStep);
    
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentStep(nextStep);
  };

  const handleStart = () => {
    // Ensure music is playing when user interacts (redundant but safe)
    setIsPlaying(true);
    navigate('theme');
  };

  // Animation Variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotate: direction > 0 ? 5 : -5,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotate: direction < 0 ? -5 : 5,
    }),
  };

  return (
    <div className="min-h-screen text-gray-900 font-comic overflow-hidden relative">
      <Background />
      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      
      {/* Transition Effects Overlay */}
      <TransitionFX step={currentStep} />

      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait" custom={direction}>
          
          {/* LOADING */}
          {currentStep === 'loading' && (
            <motion.div
              key="loading"
              className="text-center flex flex-col items-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
              >
                <Loader2 size={64} className="text-boteco-red" />
              </motion.div>
              <h2 className="font-rye text-2xl text-white drop-shadow-md bg-black/50 px-4 py-2 rounded">
                Gelando a cerveja...
              </h2>
            </motion.div>
          )}

          {/* INTRO */}
          {currentStep === 'intro' && (
            <motion.div
              key="intro"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-md bg-white p-8 rounded-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black text-center transform -rotate-2 relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-red-500/20 transform skew-x-12"></div>
              
              <h1 className="font-rye text-5xl text-boteco-red mb-4 leading-tight drop-shadow-sm">
                BOTECO DO KAINÃ
              </h1>
              <p className="font-marker text-xl mb-8 text-gray-600 transform rotate-1">
                O convite mais fubanga do ano!
              </p>
              
              <button
                onClick={handleStart}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-2xl shadow-lg border-b-4 border-green-800 active:border-b-0 active:translate-y-1 transition-all animate-pulse flex items-center justify-center gap-2"
              >
                <Beer size={28} />
                DISGRAÇA É ISSO?
              </button>
            </motion.div>
          )}

          {/* THEME */}
          {currentStep === 'theme' && (
            <StepLayout
              key="theme"
              direction={direction}
              variants={variants}
              onBack={() => navigate('intro')}
              onNext={() => navigate('attractions')}
              nextLabel="Ver Atrações"
              title="O Tema É:"
              icon={<Star className="text-yellow-500" />}
            >
               <div className="bg-yellow-100 p-6 border-4 border-dashed border-yellow-600 transform rotate-1 mb-4">
                  <h2 className="font-marker text-4xl text-center text-boteco-red mb-4 leading-none">
                    {PARTY_INFO.theme}
                  </h2>
                  <p className="text-center font-comic text-lg font-bold text-gray-800">
                    {PARTY_INFO.dressCode}
                  </p>
               </div>
               <div className="text-center text-sm text-gray-500 italic">
                  (Se não vier a caráter vai passar vergonha)
               </div>
            </StepLayout>
          )}

          {/* ATTRACTIONS */}
          {currentStep === 'attractions' && (
            <StepLayout
              key="attractions"
              direction={direction}
              variants={variants}
              onBack={() => navigate('theme')}
              onNext={() => navigate('food')}
              nextLabel="Comes e Bebes"
              title="Atrações"
              icon={<Star className="text-purple-600" />}
            >
               <div className="space-y-4">
                 {ATTRACTIONS.map((att, idx) => (
                   <div key={idx} className="flex items-center gap-4 bg-gray-100 p-3 rounded border-l-4 border-boteco-red shadow-sm">
                      <div className="bg-white p-2 rounded-full border border-gray-300 text-boteco-red">
                        {att.icon}
                      </div>
                      <span className="font-marker text-xl">{att.name}</span>
                   </div>
                 ))}
               </div>
            </StepLayout>
          )}

          {/* FOOD & DRINK */}
          {currentStep === 'food' && (
            <StepLayout
              key="food"
              direction={direction}
              variants={variants}
              onBack={() => navigate('attractions')}
              onNext={() => navigate('experiences')}
              nextLabel="Experiências"
              title="Comes & Bebes"
              icon={<Utensils className="text-orange-600" />}
            >
              <div className="bg-black text-white p-6 rounded-lg border-4 border-gray-600 shadow-xl font-marker relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-red-600 transform rotate-45 translate-x-8 -translate-y-8"></div>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Cerveja</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Destilados Duvidosos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Cachorro-quente e coisaradas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                    <span>Terá Opção Vegana</span>
                  </li>
                </ul>
              </div>
              <div className="mt-4 bg-blue-100 p-3 rounded text-blue-900 text-sm font-bold text-center border border-blue-300">
                {PARTY_INFO.obs}
              </div>
            </StepLayout>
          )}

          {/* EXPERIENCES */}
          {currentStep === 'experiences' && (
            <StepLayout
              key="experiences"
              direction={direction}
              variants={variants}
              onBack={() => navigate('food')}
              onNext={() => navigate('location')}
              nextLabel="Onde vai ser?"
              title="Experiências"
              icon={<Star className="text-boteco-yellow" />}
            >
              <div className="bg-white border-2 border-gray-300 p-1 shadow-sm">
                {/* Clipboard clip visual */}
                <div className="mx-auto w-24 h-4 bg-gray-400 rounded-t mb-2"></div>
                
                <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="group p-2 hover:bg-yellow-50 rounded transition-colors border-b border-dashed border-gray-200 last:border-0">
                      <div className="flex gap-2 items-baseline">
                        <span className="font-bold text-boteco-red text-lg">#{idx + 1}</span>
                        <h4 className="font-marker text-lg leading-tight">{exp.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm pl-6">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </StepLayout>
          )}

          {/* LOCATION */}
          {currentStep === 'location' && (
            <motion.div
              key="location"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-md bg-white p-1 rounded-sm shadow-2xl transform rotate-1 relative"
            >
               <div className="bg-boteco-yellow p-6 border-4 border-black border-double">
                  <button 
                    onClick={() => navigate('experiences')}
                    className="absolute top-4 left-4 text-black/50 hover:text-black transition-colors z-20"
                  >
                    <ArrowLeft size={24} />
                  </button>

                  <h2 className="font-rye text-3xl text-center mb-6 mt-2 uppercase border-b-4 border-black pb-2">
                    Localização
                  </h2>

                  <div className="bg-white p-4 transform -rotate-1 shadow-md border border-gray-400 mb-6">
                    <div className="flex items-center gap-2 mb-2 text-boteco-red">
                      <MapPin size={28} />
                      <span className="font-bold text-xl">Endereço</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800 leading-tight">
                      {PARTY_INFO.address}
                    </p>
                    <p className="text-gray-600">{PARTY_INFO.city}</p>
                  </div>

                  <div className="bg-boteco-red text-white p-4 text-center transform rotate-1 mb-6 shadow-md">
                    <div className="flex justify-center items-center gap-2 mb-1">
                       <Calendar size={20} />
                       <span className="font-marker text-xl">DATA</span>
                    </div>
                    <p className="font-bold text-lg">06/12 Sábado</p>
                    <p className="text-sm opacity-90">Começa as 16h e sabe-se lá quado termina...</p>
                  </div>

                  <a 
                    href={WHATSAPP_GROUP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-green-600 hover:bg-green-700 text-white text-center font-bold py-4 px-2 rounded shadow-lg border-b-4 border-green-900 active:border-b-0 active:translate-y-1 transition-all"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 text-xl md:text-2xl font-marker leading-none">
                         BROTA NO GRUPO DO ZAP
                      </div>
                    </div>
                  </a>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- Helper Component for Steps ---
interface StepLayoutProps {
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  nextLabel: string;
  title: string;
  icon?: React.ReactNode;
  variants: any;
  direction: number;
}

const StepLayout: React.FC<StepLayoutProps> = ({ 
  children, onNext, onBack, nextLabel, title, icon, variants, direction 
}) => {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full max-w-md bg-white p-6 md:p-8 rounded-sm shadow-xl border-2 border-gray-200 relative z-10"
    >
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="absolute top-4 left-4 p-2 text-gray-400 hover:text-boteco-red transition-colors rounded-full hover:bg-gray-100"
      >
        <ArrowLeft size={24} />
      </button>

      {/* Header */}
      <div className="text-center mb-6 mt-2">
        {icon && <div className="inline-block mb-2 p-3 bg-gray-100 rounded-full border-2 border-gray-200 shadow-sm">{icon}</div>}
        <h2 className="font-rye text-3xl text-gray-800 leading-none">{title}</h2>
        <div className="h-1 w-20 bg-boteco-red mx-auto mt-2 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="mb-8">
        {children}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="w-full bg-boteco-red hover:bg-red-800 text-white font-bold py-3 px-6 rounded shadow-md border-b-4 border-red-900 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 text-lg font-marker"
      >
        {nextLabel}
        <ArrowRight size={20} />
      </button>
    </motion.div>
  );
};

// --- Transition Effects Component ---
const TransitionFX: React.FC<{ step: string }> = ({ step }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // When step changes, show images
    if (TRANSITION_IMAGES[step]) {
      setVisible(true);
      // Hide after 2 seconds
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [step]);

  // Generate deterministic positions based on index so they don't jump around on re-renders
  const getPosition = (index: number, total: number) => {
    const positions = [
      { top: '10%', left: '5%' },
      { bottom: '10%', right: '5%' },
      { top: '15%', right: '10%' },
      { bottom: '20%', left: '10%' },
      { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
    ];
    return positions[index % positions.length];
  };

  return (
    <AnimatePresence>
      {visible && TRANSITION_IMAGES[step]?.map((src, index) => {
        const pos = getPosition(index, TRANSITION_IMAGES[step].length);
        const randomRotate = (index % 2 === 0 ? 1 : -1) * (Math.random() * 15 + 5);
        
        return (
          <motion.div
            key={`${step}-${index}`}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: randomRotate,
              y: [0, -20, 0]
            }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="fixed z-50 pointer-events-none drop-shadow-2xl"
            style={{ 
              ...pos,
              maxWidth: '180px',
              maxHeight: '180px'
            }}
          >
             <img 
               src={src} 
               alt="sticker" 
               className="w-full h-full object-cover border-4 border-white shadow-lg rounded-sm"
             />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default App;