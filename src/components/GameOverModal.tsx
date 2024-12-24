import { Props } from './types';
import { FinalStat } from './types';

export function GameOverModal({ values, setFunction }: Props<FinalStat>) {
  const handleClicks = (e) => {
    if (e.target.matches('#quit-btn')) {
      document.getElementById('best').dataset.value = '0';
      setFunction('0');
    }
    if (e.target.matches('#play-btn')) {
      document.getElementById('best').dataset.value = values.latestBestScore;
    }
    const modal = document.getElementById('game-over-modal');
    modal?.classList.remove('active');
  };
  return (
    <div id="game-over-modal">
      <div id="game-over-title">{values.latestBestScore}</div>
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
