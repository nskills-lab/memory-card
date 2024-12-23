import './assets/styles/App.css';
import { Board } from './components/Board';

/**
 * Steps:


 * -  Way to reset the score if a user quits the game
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
