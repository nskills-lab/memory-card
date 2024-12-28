import { GameStats } from './types';
export function ScoreBoard({ best, current, progress }: GameStats) {
  return (
    <div id="score-board">
      <div id="best">Best score - {best}</div>
      <div id="current">Current score - {current}</div>
      <div id="game-progress">
        <span>{progress}</span>

        <progress
          id="attempts"
          max="7"
          value={progress}
          className="progress-color"
        ></progress>
        <span>7</span>
      </div>
    </div>
  );
}
