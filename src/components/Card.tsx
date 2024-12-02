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
      console.log(drawnCards);
      updateCards(drawnCards);
    };
    fetchCards();
  }, []);

  useEffect(() => {
    const reshuffleCards = async () => {
      await DeckOfCards.reshuffleCards(DeckOfCards.deckId);
      const drawnCards = await DeckOfCards.drawCards(DeckOfCards.deckId);
      updateCards(drawnCards);
    };

    const playSound = () => {
      const audio = document.querySelector('#audio');
      audio.play();
    };
    document.addEventListener('click', (e) => {
      if (e.target.matches('.card-images') || e.target.matches('.card')) {
        playSound();
        reshuffleCards();
      }
    });
  }, []);

  return (
    <>
      {cards.map((card) => (
        <div className="card">
          <img className="card-images" src={card.images.png}></img>
        </div>
      ))}
    </>
  );
}
