export function GameOverModal({ best }) {
  const handleClicks = (e) => {
    const modal = document.getElementById('game-over-modal');
    modal?.classList.remove('active');
    if (e.target.matches('#quit-btn')) {
      document.getElementById('best').dataset.value = '0';
    }
    if (e.target.matches('#play-btn')) {
      document.getElementById('best').dataset.value = best;
    }
  };
  return (
    <div id="game-over-modal">
      <div id="game-over-title">Game Over!</div>
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
