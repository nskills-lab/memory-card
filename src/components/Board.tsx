import { useEffect, useState } from 'react';
import { Card } from './Card';
import DeckOfCards from '../containers/deckOfCards';
import { DrawnCard, GameStats, Props } from './types';
import useSound from 'use-sound';
import mySound from '../assets/styles/whoosh-sound.mp3';

export function Board({ values, setFunctions }: Props<GameStats>) {
  const [cards, setCards] = useState([]);
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);
  const [clickedCards, setClickedCards] = useState<Array<string | undefined>>(
    []
  );
  const { best, current, progress } = values;
  const [setBestScore, setCurrentScore, setProgress, setGameResult] =
    setFunctions;

  const [playSound] = useSound(mySound);

  const flipCardsFaceDown = () => {
    console.log('Flipped ...');
    const cardElements = [...document.querySelectorAll('.card')];
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard?.classList.add('card-flip');
    });
  };

  const resetTracks = () => {
    const convertedBest = parseInt(best);
    const covertedCurrent = parseInt(current);
    if (covertedCurrent > convertedBest) {
      setBestScore(String(covertedCurrent));
    }
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

      console.log('current', progress);
      flipCardsFaceDown();
      setTimeout(() => {
        setFront(!front);
      }, 1000);
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
      <div id="board">
        {cards.map((card: DrawnCard) => (
          <Card image={card.image} code={card.code}></Card>
        ))}
      </div>
    </>
  );
}
