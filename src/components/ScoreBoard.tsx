export function ScoreBoard({ best, current }) {
  return (
    <div id="score-board">
      <div id="best">Best score - {best}</div>
      <div id="current">Current score - {current}</div>
    </div>
  );
}
