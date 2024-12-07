import { useEffect, useState } from 'react';
import DeckOfCards from '../containers/deckOfCards';

export function Card() {
  const [cards, updateCards] = useState([]);

  // Runs one time when a component is mounted
  useEffect(() => {
    console.log('Mounting');

    const fetchCards = async () => {
      DeckOfCards.deckId = await DeckOfCards.getNewDeck();
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      updateCards(drawnCards);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const reshuffleCards = async () => {
      await DeckOfCards.reshuffleCards(DeckOfCards.deckId);
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      console.log(drawnCards);
      updateCards(drawnCards);
    };

    const playSound = () => {
      const audio = document.querySelector('#audio');
      audio.play();
    };

    document.addEventListener('click', (e) => {
      playSound();
      if (e.target.matches('.card-front')) {
        const cardElements = [...document.querySelectorAll('.card')];
        cardElements.forEach((card) => {
          const innerCard = card.querySelector('.card-inner');
          innerCard.classList.toggle('card-flip');
        });
        reshuffleCards();

        // return () => {
        //   [...document.querySelectorAll('.card')].forEach((card) => {
        //     const innerCard = card.querySelector('.card-inner');
        //     innerCard.classList.remove('card-flip');
        //   });
        // };
      }
    });
  }, []);

  return (
    <>
      {cards.map((card) => (
        <div className="card">
          <div className="card-inner">
            <img className="card-front" src={card.images.png}></img>
            <img className="card-back"></img>
          </div>
        </div>
      ))}
    </>
  );
}
