import { motion, AnimatePresence } from "framer-motion";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState, useEffect } from "react";
import { challenges } from "../data/challenges";
import MimeChallenge from "./MimeChallenge";

export default function Game({ teams }) {
  const [currentTeam, setCurrentTeam] = useState(1);
  const [scores, setScores] = useState({ team1: 0, team2: 0 });
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);

  const getRandomChallenge = () => {
    const categories = Object.keys(challenges);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const challenge = challenges[category][
      Math.floor(Math.random() * challenges[category].length)
    ];
    return { ...challenge, category };
  };

  const handleScore = (success) => {
    if (success) {
      setScores(prev => ({
        ...prev,
        [`team${currentTeam}`]: prev[`team${currentTeam}`] + (currentChallenge?.points || 2)
      }));
    }
    
    setCurrentTeam(currentTeam === 1 ? 2 : 1);
    setShowAnswer(false);
    setCurrentChallenge(getRandomChallenge());
    setIsPlaying(true);
  };

  useEffect(() => {
    setCurrentChallenge(getRandomChallenge());
  }, []);

  return (
    <motion.div
      className="game-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="scoreboard glass-card">
        {[1, 2].map(team => (
          <motion.div
            key={team}
            className={`team-score ${currentTeam === team ? 'active' : ''}`}
            animate={{
              scale: currentTeam === team ? 1.05 : 1,
              opacity: currentTeam === team ? 1 : 0.8
            }}
          >
            <h3>Équipe {team}</h3>
            <motion.div
              className="score"
              key={scores[`team${team}`]}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
            >
              {scores[`team${team}`]}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="challenge-card glass-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <h2>Défi pour l'équipe {currentTeam}</h2>
          
          {currentChallenge?.category === 'mimes' ? (
            <MimeChallenge onComplete={() => setIsPlaying(true)} />
          ) : (
            <motion.div
              className="challenge-text"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              {currentChallenge?.category === 'rebus' ? (
                <div className="rebus-challenge">
                  <p className="rebus-icons">{currentChallenge.challenge}</p>
                </div>
              ) : (
                <p>{currentChallenge?.challenge}</p>
              )}
            </motion.div>
          )}

          <div className="timer-container">
            <CountdownCircleTimer
              isPlaying={isPlaying}
              duration={30}
              colors={["#00ff00", "#F7B801", "#A30000"]}
              colorsTime={[30, 10, 0]}
              size={120}
              strokeWidth={12}
              onComplete={() => {
                setIsPlaying(false);
                setShowAnswer(true);
              }}
            >
              {({ remainingTime }) => (
                <div className="timer-value">
                  {remainingTime}
                  <span>sec</span>
                </div>
              )}
            </CountdownCircleTimer>
          </div>

          {showAnswer && currentChallenge?.reponse && (
            <motion.div
              className="answer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3>Réponse:</h3>
              <p>{currentChallenge.reponse}</p>
            </motion.div>
          )}

          <div className="buttons-container">
            <motion.button
              className="button-success"
              onClick={() => handleScore(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Réussi ✓
            </motion.button>
            <motion.button
              className="button-fail"
              onClick={() => handleScore(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Raté ✗
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
