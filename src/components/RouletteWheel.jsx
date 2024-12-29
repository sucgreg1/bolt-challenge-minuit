import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function RouletteWheel({ items, onStop, size = 300 }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const spinWheel = () => {
    if (!isSpinning) {
      const extraSpins = 5; // Nombre de tours complets
      const randomAngle = Math.random() * 360;
      const totalRotation = rotation + (360 * extraSpins) + randomAngle;
      const finalIndex = Math.floor((360 - (totalRotation % 360)) / (360 / items.length));
      
      setIsSpinning(true);
      setRotation(totalRotation);
      
      setTimeout(() => {
        setIsSpinning(false);
        setSelectedIndex(finalIndex);
        onStop(items[finalIndex]);
      }, 3000);
    }
  };

  const getItemStyle = (index) => {
    const angle = (index * 360) / items.length;
    const rotate = `rotate(${angle}deg) translateY(-${size * 0.4}px)`;
    return {
      position: 'absolute',
      width: '100px',
      textAlign: 'center',
      transform: rotate,
      transformOrigin: 'center bottom',
      padding: '5px',
      fontSize: '14px',
      color: selectedIndex === index && !isSpinning ? '#FFD700' : '#fff',
      fontWeight: selectedIndex === index && !isSpinning ? 'bold' : 'normal',
    };
  };

  return (
    <div style={{ 
      width: `${size}px`, 
      height: `${size}px`, 
      position: 'relative',
      margin: '20px auto' 
    }}>
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.1)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          cursor: isSpinning ? 'default' : 'pointer',
        }}
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: "easeOut" }}
        onClick={spinWheel}
      >
        {items.map((item, index) => (
          <div key={index} style={getItemStyle(index)}>
            {item}
          </div>
        ))}
      </motion.div>
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '20px solid #FFD700',
        }}
      />
    </div>
  );
}
