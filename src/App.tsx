import './assets/styles/App.css';
import { Board } from './components/Board';

/**
 * Steps:


 * -  Way to restart the game
 * -  Add short game instructions
 * -  Fix Typescript mistakes
 * -  Have the game published in github pages
 *
 */

function App() {
  return (
    <div id="game-container">
      <div id="title">
        <p> Memory Card Game</p>
      </div>
      <Board></Board>
    </div>
  );
}

export default App;
