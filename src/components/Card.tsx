import { useEffect, useState } from 'react';
import DeckOfCards from '../containers/deckOfCards';

export function Card() {
  const [cards, updateCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      const deckId = await DeckOfCards.getNewDeck();
      const drawnCards = await DeckOfCards.drawCards(deckId);
      updateCards(drawnCards);
    };
    fetchCards();
    console.log(cards);
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
