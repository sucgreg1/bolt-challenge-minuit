import React, { useState } from 'react';
import Welcome from './components/Welcome';
import Game from './components/Game';
import './App.css';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [teams, setTeams] = useState(null);

  const handleStartGame = (teams) => {
    setTeams(teams);
    setGameStarted(true);
  };

  return (
    <div className="app">
      {!gameStarted ? (
        <Welcome onStartGame={handleStartGame} />
      ) : (
        <Game teams={teams} />
      )}
    </div>
  );
}
