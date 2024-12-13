import { useEffect, useState } from 'react';
import DeckOfCards from '../containers/deckOfCards';

export function Card() {
  const [cards, updateCards] = useState([]);
  const [flip, setFlip] = useState(false);

  // Runs one time when a component is mounted
  useEffect(() => {
    const fetchCards = async () => {
      DeckOfCards.deckId = await DeckOfCards.getNewDeck();
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      updateCards(drawnCards);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const reshuffleCards = async () => {
      console.log('Reshuffling');
      await DeckOfCards.reshuffleCards(DeckOfCards.deckId);
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      console.log(drawnCards);
      updateCards(drawnCards);
    };

    const handler = (e) => {
      if (e.target.matches('.card-front') || e.target.matches('.card-back')) {
        const playSound = () => {
          const audio = document.querySelector('#audio');
          audio.play();
        };
        playSound();
        handleClick();
        if (DeckOfCards.deckId) {
          reshuffleCards();
        }
      }
    };
    document.addEventListener('click', handler);

    return () => {
      console.log('Cleaning up');
      document.removeEventListener('click', handler);
    };
  }, []);

  function handleClick() {
    console.log('Flipped');
    const cardElements = [...document.querySelectorAll('.card')];
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard.classList.remove('card-reflip');
      innerCard.classList.toggle('card-flip');
    });
  }

  useEffect(() => {
    const cardElements = [...document.querySelectorAll('.card')];
    cardElements.forEach((card) => {
      const innerCard = card.querySelector('.card-inner');
      innerCard.classList.remove('card-flip');
      innerCard.classList.toggle('card-reflip');
    });
  }, [cards]);

  return (
    <>
      {cards.map((card) => (
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
