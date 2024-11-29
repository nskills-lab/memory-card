class DeckOfCardsClient {
  baseEndpoint = () => {
    return 'https://www.deckofcardsapi.com/api/deck';
  };
}

export const deckOfCardsClient = new DeckOfCardsClient();
