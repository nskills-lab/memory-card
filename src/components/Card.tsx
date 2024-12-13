import { useEffect, useState } from 'react';
import DeckOfCards from '../containers/deckOfCards';
import { DrawnCard } from './types';

export function Card() {
  const [cards, updateCards] = useState([]);
  const [front, setFront] = useState(false);
  const [back, setBack] = useState(false);

  function handleClick() {
    console.log('Flipped ...');
    const cardElements = [...document.querySelectorAll('.card')];
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard.classList.add('card-flip');
    });
  }

  // Runs one time when a component is mounted
  useEffect(() => {
    console.log('Mounted ...');
    const fetchCards = async () => {
      DeckOfCards.deckId = await DeckOfCards.getNewDeck();
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      updateCards(drawnCards);
    };
    fetchCards();
  }, []);

  // Runs everytime a page renders
  useEffect(() => {
    const handler = (e) => {
      if (e.target.matches('.card-front') || e.target.matches('.card-back')) {
        const playSound = () => {
          const audio = document.querySelector('#audio');
          audio.play();
        };
        playSound();
        handleClick();
        setTimeout(() => {
          setFront(!front);
        }, 2000);
      }
    };
    document.addEventListener('click', handler);
    console.log('Click handler ...');
    return () => {
      document.removeEventListener('click', handler);
    };
  });

  // Flip back only after all the cards have been updated
  useEffect(() => {
    console.log('Flip back ...');
    const cardElements = [...document.querySelectorAll('.card')];
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard.classList.remove('card-flip');
    });
  }, [back]);

  // Reshuffle cards when a user clicks on any of the cards
  useEffect(() => {
    const reshuffleCards = async () => {
      await DeckOfCards.reshuffleCards(DeckOfCards.deckId);
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      updateCards(drawnCards);
    };

    if (DeckOfCards.deckId) {
      reshuffleCards().then(() => {
        setBack(!back);
      });
    }
  }, [front]);

  return (
    <>
      {cards.map((card: DrawnCard) => (
        <div className="card">
          <div className="card-inner">
            <img className="card-front" src={card.image}></img>
            <img className="card-back"></img>
          </div>
        </div>
      ))}
    </>
  );
}
