import { deckOfCardsClient } from '../api/client/deckOfCards';

export default class DeckOfCards {
  static deckId: string;
  static async getNewDeck() {
    const resource =
      deckOfCardsClient.baseEndpoint() + '/new/shuffle/?deck_count=1';

    const res = await fetch(resource, { mode: 'cors' });
    if (!res.ok) {
      throw new Error('HTTP status ' + res.status);
    }

    return (await res.json()).deck_id;
  }

  static async drawCards(deckId: string) {
    const resource =
      deckOfCardsClient.baseEndpoint() + `/${deckId}/draw/?count=10`;
    const res = await fetch(resource, { mode: 'cors' });
    if (!res.ok) {
      throw new Error('HTTP status ' + res.status);
    }
    const cards = (await res.json()).cards;
    return cards;
  }

  static async reshuffleCards(deckId: string) {
    const resource = deckOfCardsClient.baseEndpoint() + `/${deckId}/shuffle/`;
    const res = await fetch(resource, { mode: 'cors' });
    if (!res.ok) {
      throw new Error('HTTP status ' + res.status);
    }
  }
}
