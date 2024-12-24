import { useState } from 'react';
import './assets/styles/App.css';
import { Board } from './components/Board';
import { GameOverModal } from './components/GameOverModal';
import { ScoreBoard } from './components/ScoreBoard';

/**
 * Steps:
 * -  Fix Typescript mistakes
 * - Clean up, remove duplication, basically make it better
 */

function App() {
  const [best, setBestScore] = useState(
    document.getElementById('best')?.dataset.value ?? '0'
  );
  const [gameResult, setGameResult] = useState('You Won!');
  const [current, setCurrentScore] = useState(0);
  const [progress, setProgress] = useState(0);
  return (
    <div id="game-container">
      <div id="title">
        <p> Memory Card Game</p>
      </div>
      <ScoreBoard
        current={current}
        best={best}
        progress={progress}
      ></ScoreBoard>
      <Board
        current={current}
        best={best}
        progress={progress}
        setBestScore={setBestScore}
        setGameResult={setGameResult}
        setCurrentScore={setCurrentScore}
        setProgress={setProgress}
      ></Board>
      <GameOverModal
        best={best}
        result={gameResult}
        setBestScore={setBestScore}
      ></GameOverModal>
    </div>
  );
}

export default App;
