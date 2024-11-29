import { deckOfCardsClient } from '../api/client/deckOfCards';

export default class DeckOfCards {
  static async getNewDeck() {
    const resource =
      deckOfCardsClient.baseEndpoint() + '/new/shuffle/?deck_count=10';

    const res = await fetch(resource, { mode: 'cors' });
    if (!res.ok) {
      throw new Error('HTTP status ' + res.status);
    }

    return (await res.json()).deck_id;
  }

  static async drawCards(deckId: string) {
    const resource =
      deckOfCardsClient.baseEndpoint() + `/${deckId}/draw/?count=4`;
    const res = await fetch(resource, { mode: 'cors' });
    if (!res.ok) {
      throw new Error('HTTP status ' + res.status);
    }

    return (await res.json()).cards;
  }
}
