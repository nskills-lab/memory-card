import { FinalStat } from './types';

export function GameOverModal({ bestScoreRef, gameResultRef }: FinalStat) {
  const handleClicks = (e: React.MouseEvent) => {
    const target = e.target as Element;
    if (target.matches('#quit-btn')) {
      bestScoreRef.current = 0;
    }
    const modal = document.getElementById('game-over-modal');
    modal?.classList.remove('active');
  };
  return (
    <div id="game-over-modal">
      <div id="game-over-title">{gameResultRef.current}</div>
      <div id="game-over-btns">
        <button id="play-btn" onClick={handleClicks}>
          Play Again
        </button>
        <button id="quit-btn" onClick={handleClicks}>
          Quit
        </button>
      </div>
    </div>
  );
}
