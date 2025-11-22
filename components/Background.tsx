import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FLOATING_ITEMS } from '../constants';

const Background: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {/* Tile Pattern Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #ccc 25%, transparent 25%), 
            linear-gradient(135deg, #ccc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #ccc 75%),
            linear-gradient(135deg, transparent 75%, #ccc 75%)
          `,
          backgroundSize: '40px 40px',
          backgroundColor: '#fffdf0' 
        }}
      />
      
      {/* Grime Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-900/10 to-black/20 mix-blend-multiply" />

      {/* Floating Items */}
      {windowSize.width > 0 && FLOATING_ITEMS.map((item, index) => {
        const randomX = Math.random() * windowSize.width;
        const randomY = Math.random() * windowSize.height;

        return (
          <motion.div
            key={item.id}
            className={`absolute ${item.size} drop-shadow-2xl opacity-90`}
            initial={{ x: randomX, y: randomY, rotate: 0 }}
            animate={{
              y: [randomY - 50, randomY + 50, randomY - 50],
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: item.speed + 5, // Randomize duration slightly
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
            style={{
              zIndex: index,
            }}
          >
            {item.emoji ? (
              <span className="filter drop-shadow-lg">{item.emoji}</span>
            ) : (
              <div className="filter drop-shadow-lg">{item.icon}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Background;