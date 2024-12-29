import React from 'react';
import { motion } from "framer-motion";
import { useState } from "react";
import { CyberGlitch } from './CyberGlitch';

export default function Welcome({ onStartGame }) {
  const [players, setPlayers] = useState(Array(8).fill(''));
  const [showTeams, setShowTeams] = useState(false);
  const [teams, setTeams] = useState({ team1: [], team2: [] });

  const handlePlayerChange = (index, value) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);
  };

  const createTeams = () => {
    const shuffled = [...players].sort(() => Math.random() - 0.5);
    setTeams({
      team1: shuffled.slice(0, 4),
      team2: shuffled.slice(4)
    });
    setShowTeams(true);
  };

  const startGame = () => {
    onStartGame(teams);
  };

  return (
    <div className="welcome-container cyberpunk">
      <CyberGlitch>
        <h1 className="title-gradient">Challenge de Minuit</h1>
      </CyberGlitch>

      {!showTeams ? (
        <motion.div 
          className="players-form glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Entrez les noms des joueurs</h2>
          {players.map((player, index) => (
            <motion.input
              key={index}
              type="text"
              value={player}
              onChange={(e) => handlePlayerChange(index, e.target.value)}
              placeholder={`Joueur ${index + 1}`}
              className="input-styled"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
          <motion.button 
            className="button-primary"
            onClick={createTeams}
            disabled={players.some(p => !p.trim())}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Créer les équipes
          </motion.button>
        </motion.div>
      ) : (
        <motion.div 
          className="teams-display glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="teams-grid">
            <motion.div 
              className="team"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h3>Équipe 1</h3>
              {teams.team1.map((player, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {player}
                </motion.p>
              ))}
            </motion.div>
            <motion.div 
              className="team"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h3>Équipe 2</h3>
              {teams.team2.map((player, i) => (
                <motion.p 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {player}
                </motion.p>
              ))}
            </motion.div>
          </div>
          <div className="buttons-container">
            <motion.button 
              className="button-primary"
              onClick={createTeams}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mélanger
            </motion.button>
            <motion.button 
              className="button-primary"
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Commencer le jeu
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
