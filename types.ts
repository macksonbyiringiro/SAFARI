export enum Language {
  EN = 'EN',
  RW = 'RW',
}

export enum Screen {
  HOME = 'HOME',
  LESSON_SELECTION = 'LESSON_SELECTION',
  LESSON = 'LESSON',
  REWARD = 'REWARD',
  PARENTS = 'PARENTS',
  PASSWORD = 'PASSWORD',
  QUIZ_INTRO = 'QUIZ_INTRO',
  QUIZ_TASK = 'QUIZ_TASK',
  QUIZ_RESULTS = 'QUIZ_RESULTS',
  RECORD_SOUND = 'RECORD_SOUND',
  MUSIC_BOX = 'MUSIC_BOX',
  RECORD_MUSIC = 'RECORD_MUSIC',
  DOWNLOADS = 'DOWNLOADS',
}

export enum LessonType {
    ADDITION = 'ADDITION',
    SUBTRACTION = 'SUBTRACTION',
    COUNTING = 'COUNTING',
    MUSIC_COUNTING = 'MUSIC_COUNTING',
}

export enum Level {
    EASY = 'EASY',
    MEDIUM = 'MEDIUM',
    HARD = 'HARD',
}

export interface Lesson {
    id: string;
    type: LessonType;
    titleKey: keyof LocalizationStrings;
    icon: React.FC<{className?: string}>;
}

export interface OperationProblem {
    id: number;
    type: LessonType.ADDITION | LessonType.SUBTRACTION;
    operands: [number, number];
    answer: number;
    level: Level;
}

export interface CountingProblem {
    id: number;
    type: LessonType.COUNTING | LessonType.MUSIC_COUNTING;
    answer: number;
    level: Level;
}

export type LessonProblem = OperationProblem | CountingProblem;

export interface LocalizationStrings {
  [key: string]: {
    [lang in Language]: string;
  };
}

export interface GeneratedQuizQuestion {
    question: string;
    answer: number;
}

export interface StoredFile {
  id: string;
  name: string;
  type: 'music' | 'video' | 'image' | 'document' | 'other';
  source: 'download' | 'upload';
  blob: Blob;
  size: number;
  timestamp: number;
}

export interface ActiveTransfer {
  id: string;
  name: string;
  direction: 'download' | 'upload';
  progress: number; // 0-100
  totalSize: number;
  transferredSize: number;
  error?: string;
}
