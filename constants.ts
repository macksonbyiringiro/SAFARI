
import { Language, LocalizationStrings, AdditionProblem } from './types';

export const PARENT_PASSWORD = '1234';

export const LOCALIZATION_STRINGS: LocalizationStrings = {
  // General
  appTitle: {
    [Language.EN]: "Math Safari",
    [Language.RW]: "Umenya Imibare!",
  },
  startLesson: {
    [Language.EN]: "Start Lesson",
    [Language.RW]: "Tangira Isomo",
  },
  parentsCorner: {
    [Language.EN]: "Parent's Corner",
    [Language.RW]: "Ahababyeyi",
  },
  goBackHome: {
    [Language.EN]: "Go Home",
    [Language.RW]: "Subira Intangiriro",
  },
  wellDone: {
    [Language.EN]: "Well Done!",
    [Language.RW]: "Wakoze Neza!",
  },
  youEarnedStars: {
    [Language.EN]: "You earned 3 stars!",
    [Language.RW]: "Wabonye inyenyeri 3!",
  },
  tryAgain: {
    [Language.EN]: "Not quite, try again!",
    [Language.RW]: "Si byo, ongera ugerageze!",
  },
  correct: {
    [Language.EN]: "Correct!",
    [Language.RW]: "Ni byo!",
  },
  back: {
    [Language.EN]: "Back",
    [Language.RW]: "Subira Inyuma",
  },
  
  // Lesson Intro
  monkeyIntro1: {
    [Language.EN]: "Meet Kiki the monkey! Kiki is very hungry and wants to collect some delicious bananas.",
    [Language.RW]: "Uraho! Ndi Kiki. Ndashonje cyane, nshaka gutoragura imineke myiza.",
  },
  monkeyIntro2: {
    [Language.EN]: "Look! Kiki found 2 bananas. Then, Kiki found 3 more bananas.",
    [Language.RW]: "Reba! Kiki yabonye imineke 2. Hanyuma, Kiki abona indi mineke 3.",
  },
  monkeyIntro3: {
    [Language.EN]: "To find the total, we use 'plus'. This is the plus sign: +",
    [Language.RW]: "Kugira ngo tumenye yose hamwe, dukoresha 'kuteranya'. Iki n'ikimenyetso cyo guteranya: +",
  },
  monkeyIntro4: {
    [Language.EN]: "So, 2 bananas + 3 bananas equals 5 bananas! Now it's your turn to help Kiki!",
    [Language.RW]: "Bivuze ko, imineke 2 + imineke 3 bingana n'imineke 5! Noneho ni wowe ugiye gufasha Kiki!",
  },
  next: {
    [Language.EN]: "Next",
    [Language.RW]: "Komeza",
  },
  start: {
    [Language.EN]: "Start!",
    [Language.RW]: "Tangira!",
  },

  // Parent's Corner
  parentTitle: {
    [Language.EN]: "Welcome Parents & Teachers",
    [Language.RW]: "Murakaza neza Babyeyi n'Abarimu",
  },
  parentDescription: {
    [Language.EN]: "Here you can generate new practice quizzes for your child. This requires an internet connection.",
    [Language.RW]: "Hano ushobora gukorera umwana wawe utwitozo. Ibi bisaba interineti.",
  },
  generateQuiz: {
    [Language.EN]: "Generate New Quiz",
    [Language.RW]: "Kora Ikizami Gishya",
  },
  generating: {
    [Language.EN]: "Generating...",
    [Language.RW]: "Biri gukorwa...",
  },
  quizTitle: {
    [Language.EN]: "New Practice Quiz",
    [Language.RW]: "Isuzuma Rishya",
  },
  quizError: {
    [Language.EN]: "Sorry, we couldn't create a quiz right now. Please try again later.",
    [Language.RW]: "Tubabarire, ntidushoboye gukora ikizami nonaha. Wongere ugerageze mukanya.",
  },

  // Password Screen
  passwordTitle: {
    [Language.EN]: "Enter Password",
    [Language.RW]: "Shyiramo Umubare w'ibanga",
  },
  passwordPrompt: {
    [Language.EN]: "Enter the 4-digit parent code.",
    [Language.RW]: "Shyiramo umubare w'ibanga w'imibare 4.",
  },
  passwordIncorrect: {
    [Language.EN]: "Incorrect Code",
    [Language.RW]: "Umubare siwo",
  },
};

export const ADDITION_PROBLEMS: AdditionProblem[] = [
    { id: 1, operands: [2, 3], answer: 5 },
    { id: 2, operands: [4, 1], answer: 5 },
    { id: 3, operands: [3, 3], answer: 6 },
];