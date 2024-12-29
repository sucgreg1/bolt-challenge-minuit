import { motion } from "framer-motion";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import ParticlesBackground from "./ParticlesBackground";

export default function Welcome({ onStartGame }) {
  const [players, setPlayers] = useState(Array(8).fill(""));
  const [currentStep, setCurrentStep] = useState(0);

  const titleProps = useSpring({
    from: { opacity: 0, transform: "translateY(-50px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    delay: 200
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const handleNext = () => {
    if (currentStep === 0 && players.every(p => p.trim())) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="welcome-container">
      <ParticlesBackground />
      
      <animated.h1 style={titleProps} className="title-gradient">
        Challenge de Minuit
      </animated.h1>

      <motion.div
        className="glass-card"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {currentStep === 0 ? (
          <>
            <h2 className="subtitle">Entrez les noms des joueurs</h2>
            <div className="players-grid">
              {players.map((player, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="input-wrapper"
                >
                  <input
                    type="text"
                    value={player}
                    onChange={(e) => handlePlayerChange(index, e.target.value)}
                    placeholder={`Joueur ${index + 1}`}
                    className="input-styled"
                  />
                </motion.div>
              ))}
            </div>
            <motion.button
              className="button-primary"
              onClick={handleNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!players.every(p => p.trim())}
            >
              Suivant
            </motion.button>
          </>
        ) : (
          <TeamDisplay players={players} onStartGame={onStartGame} />
        )}
      </motion.div>
    </div>
  );
}

function TeamDisplay({ players, onStartGame }) {
  const [teams] = useState(() => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    return {
      team1: shuffled.slice(0, 4),
      team2: shuffled.slice(4)
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="teams-container"
    >
      <div className="teams-grid">
        {["team1", "team2"].map((team, index) => (
          <motion.div
            key={team}
            className="team-card glass-card"
            initial={{ x: index === 0 ? -50 : 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <h3>Équipe {index + 1}</h3>
            <ul>
              {teams[team].map((player, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {player}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        className="button-primary"
        onClick={() => onStartGame(teams)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Commencer le jeu
      </motion.button>
    </motion.div>
  );
}
