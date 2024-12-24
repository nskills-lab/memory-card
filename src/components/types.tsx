export type DrawnCard = {
  code: string;
  image: string;
  images: {
    png: string;
    svg: string;
  };
  suit: string;
  value: string;
};

export type GameStats = {
  best: string;
  current: string;
  progress: string;
};
