import { useEffect, useState } from 'react';
import { Card } from './Card';
import DeckOfCards from '../containers/deckOfCards';
import { DrawnCard } from './types';
import { ScoreBoard } from './ScoreBoard';
import useSound from 'use-sound';
import mySound from '../assets/styles/whoosh-sound.mp3';
import { GameOverModal } from './GameOverModal';

export function Board() {
  const [cards, setCards] = useState([]);
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);
  const [clickedCards, setClickedCards] = useState([]);
  const [current, setCurrentScore] = useState(0);
  const [progress, setProgress] = useState(0);
  const [best, setBestScore] = useState(
    document.getElementById('best')?.dataset.value ?? '0'
  );
  const [gameResult, setGameResult] = useState('You Won!');
  const [playSound] = useSound(mySound);

  const handleClick = () => {
    console.log('Flipped ...');
    const cardElements = [...document.querySelectorAll('.card')];
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard?.classList.add('card-flip');
    });
  };

  const resetTracks = () => {
    setClickedCards([]);
    setCurrentScore(0);
    setProgress(0);
    if (current > parseInt(best)) {
      setBestScore(current.toString());
    }
  };
  const showGameResult = (result) => {
    setGameResult(result);
    const modal = document.getElementById('game-over-modal');
    modal?.classList.add('active');
  };

  const handleGameInstruction = () => {};

  // Runs one time when a component is mounted
  useEffect(() => {
    console.log('Mounted ...');
    const fetchCards = async () => {
      DeckOfCards.deckId = await DeckOfCards.getNewDeck();
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      setCards(drawnCards);
    };
    fetchCards();
  }, []);

  // Runs everytime a page renders
  useEffect(() => {
    const handler = (e) => {
      if (e.target.matches('.card-front') || e.target.matches('.card-back')) {
        setProgress((progress) => progress + 1);
        if (clickedCards.includes(e.target.dataset.id)) {
          showGameResult('You Lost!');
          resetTracks();
          return;
        }
        playSound();
        if (progress > 4) {
          showGameResult('You Won!');
          resetTracks();
          return;
        }
        setClickedCards((clickedCards) => {
          return [...clickedCards, e.target.dataset.id];
        });
        setCurrentScore((score) => score + 1);
        handleClick();
        setTimeout(() => {
          setFront(!front);
        }, 2000);
      }
    };
    document.addEventListener('click', handler);
    console.log('Click handler ...');
    return () => {
      console.log('Return ...');
      document.removeEventListener('click', handler);
    };
  });

  // Flip back only after all the cards have been updated
  useEffect(() => {
    console.log('Flip back ...');
    const cardElements = [...document.querySelectorAll('.card')];
    playSound();
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard?.classList.remove('card-flip');
    });
  }, [back]);

  // Reshuffle cards when a user clicks on any of the cards
  useEffect(() => {
    const reshuffleCards = async () => {
      await DeckOfCards.reshuffleCards(DeckOfCards.deckId);
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      setCards(drawnCards);
    };

    if (DeckOfCards.deckId) {
      reshuffleCards().then(() => {
        setBack(!back);
      });
    }
  }, [front]);
  return (
    <>
      <div id="header">
        <ScoreBoard
          current={current}
          best={best}
          progress={progress}
        ></ScoreBoard>
      </div>
      <div id="board">
        {cards.map((card: DrawnCard) => (
          <Card image={card.image} code={card.code}></Card>
        ))}
      </div>
      <GameOverModal best={best} result={gameResult}></GameOverModal>
    </>
  );
}
