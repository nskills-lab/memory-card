import React from 'react';
import './assets/styles/App.css';
import { Board } from './components/Board';
import { GameOverModal } from './components/GameOverModal';
import { ScoreBoard } from './components/ScoreBoard';
import { FinalStat, GameStats } from './components/types';

function App() {
  const bestScoreRef = React.useRef(0);
  const gameResultRef = React.useRef('Awaiting player!');
  const [current, setCurrentScore] = React.useState('0');
  const [progress, setProgress] = React.useState('0');

  const finalStat: FinalStat = {
    bestScoreRef: bestScoreRef,
    gameResultRef: gameResultRef,
  };

  const gameStats: GameStats = {
    best: bestScoreRef.current,
    current: current,
    progress: progress,
  };

  return (
    <div id="game-container">
      <div id="title">
        <p> Memory Card Game</p>
      </div>
      <ScoreBoard {...gameStats}></ScoreBoard>
      <Board
        values={gameStats}
        setFunctions={[setCurrentScore, setProgress]}
        {...finalStat}
      ></Board>
      <GameOverModal {...finalStat}></GameOverModal>
    </div>
  );
}

export default App;
