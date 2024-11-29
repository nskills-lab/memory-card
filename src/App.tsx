import './assets/styles/App.css';
import { Board } from './components/Board';

/**
 * Steps:
 * 1. Fetching of cards => done
 * 2. Displaing of cards => done
 * 3. Event listener that if  a user clicks, reshuffles the cards and displays them
 * 4. Way to keep track of if a user has in the current game iteration clicked on this card
 * 5. Way to keep the score
 * 6. Way to restart the game
 * 7. Way to flip cards: show the back of cards:
 * - find a design for the back of the card
 * - add sound that imitate the swooshing
 * 8. Add short game instructions
 * 7. Fix Typescript mistakes
 * 8. Have the game published in github pages:
 * - add github action to rebuild everytime i push to main branch
 *
 */

function App() {
  return (
    <div id="game-container">
      <div id="title"> Memory Card Game</div>
      <Board></Board>
    </div>
  );
}

export default App;
