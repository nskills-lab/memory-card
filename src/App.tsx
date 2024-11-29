import './assets/styles/App.css';
import { Board } from './components/Board';

function App() {
  return (
    <div id="game-container">
      <div id="title"> Memory Card Game</div>
      <Board></Board>
    </div>
  );
}

export default App;
