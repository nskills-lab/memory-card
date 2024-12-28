import React from 'react';

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
  best: number;
  current: string;
  progress: string;
};

export type FinalStat = {
  bestScoreRef: React.MutableRefObject<number>;
  gameResultRef: React.MutableRefObject<string>;
};

export type Props<T> = {
  values: T;
  setFunctions: Array<React.Dispatch<React.SetStateAction<string>>>;
};
