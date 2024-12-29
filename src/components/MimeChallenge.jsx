import { useState } from 'react';
import RouletteWheel from './RouletteWheel';
import { mimeData } from '../data/mimeData';
import { motion } from 'framer-motion';

export default function MimeChallenge({ onComplete }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const handleActionStop = (action) => {
    setSelectedAction(action);
    checkBothSelected(action, selectedSubject);
  };

  const handleSubjectStop = (subject) => {
    setSelectedSubject(subject);
    checkBothSelected(selectedAction, subject);
  };

  const checkBothSelected = (action, subject) => {
    if (action && subject) {
      setIsReady(true);
    }
  };

  return (
    <div className="mime-challenge">
      <div className="roulettes-container">
        <div className="roulette-section">
          <h3>Action</h3>
          <RouletteWheel 
            items={mimeData.actions} 
            onStop={handleActionStop}
          />
        </div>
        
        <div className="roulette-section">
          <h3>Sujet</h3>
          <RouletteWheel 
            items={mimeData.subjects} 
            onStop={handleSubjectStop}
          />
        </div>
      </div>

      {isReady && (
        <motion.div 
          className="mime-result"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Votre défi :</h2>
          <p className="challenge-text">
            {selectedAction} {selectedSubject}
          </p>
        </motion.div>
      )}
    </div>
  );
}
