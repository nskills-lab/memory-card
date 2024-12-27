import { Props } from './types';
import { FinalStat } from './types';

export function GameOverModal({ values, setFunctions }: Props<FinalStat>) {
  const handleClicks = (e: React.MouseEvent) => {
    const bestScoreElement = document.getElementById('best')!;
    const target = e.target as Element;
    const [setBestScore] = setFunctions;
    if (target.matches('#quit-btn')) {
      bestScoreElement.dataset.value = '0';
    }
    if (target.matches('#play-btn')) {
      bestScoreElement.dataset.value = values.latestBestScore;
    }
    setBestScore(bestScoreElement.dataset.value ?? '0');
    const modal = document.getElementById('game-over-modal');
    modal?.classList.remove('active');
  };
  return (
    <div id="game-over-modal">
      <div id="game-over-title">{values.gameResult}</div>
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
