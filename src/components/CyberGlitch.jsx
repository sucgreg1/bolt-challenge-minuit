import { motion } from 'framer-motion';

export function CyberGlitch({ children, intensity = 1 }) {
  return (
    <div className="glitch-container">
      <motion.div
        className="glitch-text"
        animate={{
          x: [-2, 2, -2],
          y: [1, -1, 1],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {children}
      </motion.div>
      <div className="glitch-copy" aria-hidden="true">
        {children}
      </div>
      <div className="glitch-copy" aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
