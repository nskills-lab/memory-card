import React from 'react';
import { Card } from './Card';
import DeckOfCards from '../containers/deckOfCards';
import { DrawnCard, GameStats, Props } from './types';
import useSound from 'use-sound';
import mySound from '../assets/styles/whoosh-sound.mp3';

export function Board({ values, setFunctions }: Props<GameStats>) {
  const deckIdRef = React.useRef('');
  const [cards, setCards] = React.useState([]);
  const [cardsFaceUp, setCardsFaceUp] = React.useState(false);
  const [cardsFaceDown, setCardsFaceDown] = React.useState(false);
  const [clickedCards, setClickedCards] = React.useState<
    Array<string | undefined>
  >([]);
  const { best, current, progress } = values;
  const [setBestScore, setCurrentScore, setProgress, setGameResult] =
    setFunctions;
  const [playSound] = useSound(mySound);

  const flipCardsFaceDown = () => {
    const cardElements = [...document.querySelectorAll('.card')];
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard?.classList.add('card-flip');
    });
  };

  const resetTracks = () => {
    const convertedBest = parseInt(best);
    const covertedCurrent = parseInt(current);
    const max = Math.max(covertedCurrent, convertedBest);
    setBestScore(String(max));
    setClickedCards([]);
    setCurrentScore('0');
    setProgress('0');
  };

  const showGameResult = (result: string) => {
    setGameResult(result);
    const modal = document.getElementById('game-over-modal');
    modal?.classList.add('active');
  };

  const reachedLimit = (progress: string) => {
    return parseInt(progress) + 1 > 7;
  };

  // Runs one time when a component is mounted
  React.useEffect(() => {
    const fetchCards = async () => {
      deckIdRef.current = await DeckOfCards.getNewDeck();
      const drawnCards = await DeckOfCards.drawCards(deckIdRef.current);
      setCards(drawnCards);
    };
    fetchCards();
  }, []);

  // Runs everytime a page renders
  React.useEffect(() => {
    const handler = (e: Event) => {
      const target = e.target as HTMLElement;
      // Only flip if a user has
      if (!target.matches('.card-front')) return;

      if (clickedCards.includes(target.dataset.id)) {
        showGameResult('You Lost!');
        resetTracks();
        return;
      }

      setProgress((progress) => {
        const convertedProgress = parseInt(progress);
        return String(convertedProgress + 1);
      });

      playSound();

      setCurrentScore((score) => {
        const covertedScore = parseInt(score);
        return String(covertedScore + 1);
      });

      if (reachedLimit(progress)) {
        showGameResult('You Won!');
        resetTracks();
        return;
      }

      setClickedCards((clickedCards) => {
        return [...clickedCards, target.dataset.id];
      });

      flipCardsFaceDown();
      setTimeout(() => {
        setCardsFaceUp(!cardsFaceUp);
      }, 1000);
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });

  // Flip back only after all the cards have been updated
  React.useEffect(() => {
    const cardElements = [...document.querySelectorAll('.card')];
    playSound();
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard?.classList.remove('card-flip');
    });
  }, [cardsFaceDown]);

  // Reshuffle cards when a user clicks on any of the cards
  React.useEffect(() => {
    const reshuffleCards = async () => {
      await DeckOfCards.reshuffleCards(deckIdRef.current);
      const drawnCards = await DeckOfCards.drawCards(deckIdRef.current);
      setCards(drawnCards);
    };

    if (deckIdRef.current) {
      reshuffleCards().then(() => {
        setCardsFaceDown(!cardsFaceDown);
      });
    }
  }, [cardsFaceUp]);

  return (
    <>
      <div id="board">
        {cards.map((card: DrawnCard, index: number) => (
          <Card key={index} image={card.image} code={card.code}></Card>
        ))}
      </div>
    </>
  );
}
