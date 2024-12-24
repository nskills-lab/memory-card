export function ScoreBoard({ best, current, progress }) {
  return (
    <div id="score-board">
      <div id="best" data-value="0">
        Best score - {best}
      </div>
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
