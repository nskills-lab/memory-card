import { useState } from 'react';
import './assets/styles/App.css';
import { Board } from './components/Board';
import { GameOverModal } from './components/GameOverModal';
import { ScoreBoard } from './components/ScoreBoard';
import { FinalStat, GameStats } from './components/types';

function App() {
  const [best, setBestScore] = useState(
    document.getElementById('best')?.dataset.value || '0'
  );
  const [gameResult, setGameResult] = useState('You Won!');
  const [current, setCurrentScore] = useState('0');
  const [progress, setProgress] = useState('0');

  const finalStat: FinalStat = {
    latestBestScore: best,
    gameResult: gameResult,
  };

  const gameStats: GameStats = {
    best: best,
    current: current,
    progress: progress,
  };

  return (
    <div id="game-container">
      <div id="title">
        <p> Memory Card Game</p>
      </div>
      <ScoreBoard
        best={best}
        current={current}
        progress={progress}
      ></ScoreBoard>
      <Board
        values={gameStats}
        setFunctions={[
          setBestScore,
          setCurrentScore,
          setProgress,
          setGameResult,
        ]}
      ></Board>
      <GameOverModal
        values={finalStat}
        setFunctions={[setBestScore]}
      ></GameOverModal>
    </div>
  );
}

export default App;
