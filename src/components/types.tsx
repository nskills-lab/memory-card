import { Dispatch, SetStateAction } from 'react';

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

export type FinalStat = {
  latestBestScore: string;
  gameResult: string;
};

export type Props<T> = {
  values: T;
  setFunctions: Array<Dispatch<SetStateAction<string>>>;
};
