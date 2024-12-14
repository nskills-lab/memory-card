import './assets/styles/App.css';
import { Board } from './components/Board';

/**
 * Steps:

 * - Way to keep track of if a user has in the current game iteration clicked on this card
 * -  Way to keep the score
 * -  Way to restart the game
 * -  Add short game instructions
 * -  Fix Typescript mistakes
 * -  Have the game published in github pages
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
