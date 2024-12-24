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
  best: string | number;
  current: string | number;
  progress: string | number;
  result?: string;
};

export type SetFunction = (value: string | number) => void;

export type FinalStat = {
  latestBestScore: string | number;
  gameResult: string;
};

export type Props<T> = {
  values: T;
  setFunction: Dispatch<SetStateAction<string>>;
};
