
export enum Language {
  EN = 'EN',
  RW = 'RW',
}

export enum Screen {
  HOME = 'HOME',
  LESSON = 'LESSON',
  REWARD = 'REWARD',
  PARENTS = 'PARENTS',
  PASSWORD = 'PASSWORD',
}

export interface LocalizationStrings {
  [key: string]: {
    [lang in Language]: string;
  };
}

export interface AdditionProblem {
    id: number;
    operands: [number, number];
    answer: number;
}

export interface GeneratedQuizQuestion {
    question: string;
    answer: number;
}