import React from 'react';
import { Card } from './Card';
import DeckOfCards from '../containers/deckOfCards';
import { DrawnCard, FinalStat, GameStats, Props } from './types';
import useSound from 'use-sound';
import mySound from '../assets/styles/whoosh-sound.mp3';

export function Board({
  values,
  setFunctions,
  bestScoreRef,
  gameResultRef,
}: Props<GameStats> & FinalStat) {
  const deckIdRef = React.useRef('');
  const [cards, setCards] = React.useState([]);
  const [cardsFaceUp, setCardsFaceUp] = React.useState(false);
  const [cardsFaceDown, setCardsFaceDown] = React.useState(false);
  const [clickedCards, setClickedCards] = React.useState<
    Array<string | undefined>
  >([]);
  const [playSound] = useSound(mySound);
  const [setCurrentScore, setProgress] = setFunctions;

  const flipCards = (options: 'face up' | 'face down') => {
    playSound();
    const cardElements = [...document.querySelectorAll('.card-inner')];
    cardElements.forEach((card) => {
      switch (options) {
        case 'face down':
          card?.classList.add('card-flip');
          break;
        case 'face up':
          card?.classList.remove('card-flip');
          break;
      }
    });
  };

  const resetTracks = () => {
    const max = Math.max(parseInt(values.current), bestScoreRef.current);
    bestScoreRef.current = max;
    setClickedCards([]);
    setCurrentScore('0');
    setProgress('0');
  };

  const showGameResult = (result: string) => {
    gameResultRef.current = result;
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
      // Only flip if a user has clicked when the cards are face up
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

      setCurrentScore((score) => {
        const covertedScore = parseInt(score);
        return String(covertedScore + 1);
      });

      if (reachedLimit(values.progress)) {
        showGameResult('You Won!');
        resetTracks();
        return;
      }

      setClickedCards((clickedCards) => {
        return [...clickedCards, target.dataset.id];
      });

      flipCards('face down');
      setTimeout(() => {
        setCardsFaceUp(!cardsFaceUp);
      }, 1000);
    };

    document.addEventListener('click', handler);
    return () => {
      document.removeEventListener('click', handler);
    };
  });

  // Flip cards face up only after all the them have been updated
  React.useEffect(() => {
    flipCards('face up');
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
