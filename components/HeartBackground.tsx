import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // Initialize a set of hearts
    const initialHearts = Array.from({ length: 20 }, (_, i) => i);
    setHearts(initialHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-romantic-300/30"
          initial={{
            y: "110vh",
            x: Math.random() * 100 + "vw",
            scale: Math.random() * 0.5 + 0.5,
            rotate: 0
          }}
          animate={{
            y: "-10vh",
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{
            fontSize: Math.random() * 20 + 20 + 'px'
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};

export default HeartBackground;