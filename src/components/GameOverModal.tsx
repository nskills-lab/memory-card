export function GameOverModal({ best, result }) {
  const handleClicks = (e) => {
    if (e.target.matches('#quit-btn')) {
      document.getElementById('best').dataset.value = '0';
      console.log(document.getElementById('best')?.dataset.value);
    }
    if (e.target.matches('#play-btn')) {
      document.getElementById('best').dataset.value = best;
    }
    const modal = document.getElementById('game-over-modal');
    modal?.classList.remove('active');
  };
  return (
    <div id="game-over-modal">
      <div id="game-over-title">{result!}</div>
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
