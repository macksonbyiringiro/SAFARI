import React from 'react';
import { Language, LocalizationStrings, Lesson, LessonProblem, LessonType, Level } from './types';

// Icons for lessons
const PlusIcon: React.FC<{className?: string}> = ({className}) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6v6m0 0v6m0-6h6m-6 0H6" }));
const MinusIcon: React.FC<{className?: string}> = ({className}) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 }, React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M18 12H6" }));
const CountingIcon: React.FC<{className?: string}> = ({className}) => React.createElement('div', { className: `flex items-center justify-center font-black text-2xl ${className}` }, '123');
const MusicNoteIcon: React.FC<{className?: string}> = ({className}) => React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: className, viewBox: "0 0 20 20", fill: "currentColor" }, React.createElement('path', { d: "M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" }));


export const LOCALIZATION_STRINGS: LocalizationStrings = {
  // General
  appTitle: {
    [Language.EN]: "Math Safari",
    [Language.RW]: "Umenya Imibare!",
  },
  startLesson: {
    [Language.EN]: "Start Learning",
    [Language.RW]: "Tangira Kwiga",
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
  click: {
    [Language.EN]: "Click",
    [Language.RW]: "Kanda",
  },

  // New Lesson Selection Screen
  chooseLesson: {
    [Language.EN]: "Choose a Lesson",
    [Language.RW]: "Hitamo Isomo",
  },
  chooseLevel: {
    [Language.EN]: "Choose a Level",
    [Language.RW]: "Hitamo Urwego",
  },
  addition: {
    [Language.EN]: "Addition",
    [Language.RW]: "Guteranya",
  },
  subtraction: {
    [Language.EN]: "Subtraction",
    [Language.RW]: "Gukuramo",
  },
  counting: {
    [Language.EN]: "Counting",
    [Language.RW]: "Kubara",
  },
  musicCounting: {
    [Language.EN]: "Music Counting",
    [Language.RW]: "Kubara Umuziki",
  },
  easy: {
    [Language.EN]: "Easy",
    [Language.RW]: "Icyoroshye",
  },
  medium: {
    [Language.EN]: "Medium",
    [Language.RW]: "Iringaniye",
  },
  hard: {
    [Language.EN]: "Hard",
    [Language.RW]: "Irikomeye",
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
  subtractionIntro1: {
    [Language.EN]: "Oh no! Kiki had 5 bananas, but dropped 2!",
    [Language.RW]: "Yoo! Kiki yari afite imineke 5, ariko ata 2!",
  },
  subtractionIntro2: {
    [Language.EN]: "To find how many are left, we use 'minus'. This is the minus sign: -",
    [Language.RW]: "Kugira ngo tumenye isigaye, dukoresha 'gukuramo'. Iki n'ikimenyetso cyo gukuramo: -",
  },
  subtractionIntro3: {
    [Language.EN]: "So, 5 bananas - 2 bananas equals 3 bananas! Now, your turn to help!",
    [Language.RW]: "Bivuze ko, imineke 5 - imineke 2 bingana n'imineke 3! Noneho ni wowe ugiye gufasha!",
  },
  countingIntro1: {
    [Language.EN]: "Let's help Kiki count the bananas!",
    [Language.RW]: "Reka dufashe Kiki kubara imineke!",
  },
  countingIntro2: {
    [Language.EN]: "Look at all the bananas on the screen. How many are there?",
    [Language.RW]: "Reba imineke yose iri kuri ecran. Ni ingahe?",
  },
  countingIntro3: {
    [Language.EN]: "Type the correct number and press OK. Let's start!",
    [Language.RW]: "Andika umubare nyawo hanyuma ukande OK. Reka dutangire!",
  },
  musicIntro1: {
    [Language.EN]: "Let's learn to count with music! Kiki loves to dance.",
    [Language.RW]: "Reka twige kubara n'umuziki! Kiki arakunda kubyina.",
  },
  musicIntro2: {
    [Language.EN]: "Listen to the beat! How many musical notes do you see?",
    [Language.RW]: "Umva injyana! Urabona amanota y'umuziki angahe?",
  },
  musicIntro3: {
    [Language.EN]: "Count them and type the number. Let's make some music!",
    [Language.RW]: "Yabare hanyuma wandike umubare. Reka ducurange!",
  },
  questionCounting: {
    [Language.EN]: "How many bananas in total?",
    [Language.RW]: "Hari imineke ingahe yose hamwe?",
  },
  questionMusic: {
    [Language.EN]: "How many notes are there?",
    [Language.RW]: "Hari amanota angahe?",
  },
  next: {
    [Language.EN]: "Next",
    [Language.RW]: "Komeza",
  },
  start: {
    [Language.EN]: "Start!",
    [Language.RW]: "Tangira!",
  },
  tapToPlay: {
    [Language.EN]: "Tap the notes to hear your sounds!",
    [Language.RW]: "Kanda ku manota wumve amajwi yawe!",
  },

  // Parent's Corner
  parentTitle: {
    [Language.EN]: "Welcome Parents & Teachers",
    [Language.RW]: "Murakaza neza Babyeyi n'Abarimu",
  },
  parentDescription: {
    [Language.EN]: "Here you can manage the app settings for your child.",
    [Language.RW]: "Hano ushobora kugenzura igenamiterere ry'umwana wawe.",
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
    [Language.EN]: "Are you a grown-up?",
    [Language.RW]: "Uri umuntu mukuru?",
  },
  passwordPrompt: {
    [Language.EN]: "Please solve this problem to continue.",
    [Language.RW]: "Subiza iki kibazo kugirango ukomeze.",
  },
  passwordIncorrect: {
    [Language.EN]: "Not quite. Try this one!",
    [Language.RW]: "Si byo. Gerageza iki!",
  },
  
  // Settings
  appSettings: {
    [Language.EN]: "App Settings",
    [Language.RW]: "Igenamiterere",
  },
  audioSettings: {
    [Language.EN]: "Audio Settings",
    [Language.RW]: "Ibyerekeye Amajwi",
  },
  languageSetting: {
    [Language.EN]: "Language",
    [Language.RW]: "Ururimi",
  },
  defaultDifficulty: {
    [Language.EN]: "Default Difficulty",
    [Language.RW]: "Urwego Rusanzwe",
  },
  allowChoice: {
    [Language.EN]: "Let Child Choose",
    [Language.RW]: "Reka Umwana Yihitiremo",
  },

  // Quiz
  practiceQuiz: {
    [Language.EN]: "Practice Quiz",
    [Language.RW]: "Isuzuma ry'Imyitozo",
  },
  quizIntroTitle: {
    [Language.EN]: "Ready for a Challenge?",
    [Language.RW]: "Witeguye Ikibazo?",
  },
  quizIntroDescription: {
    [Language.EN]: "Let's see what you've learned! I'll create a new quiz just for you.",
    [Language.RW]: "Reka turebe ibyo wize! Ngiye kugukorera isuzuma rishya.",
  },
  startQuiz: {
    [Language.EN]: "Start Quiz",
    [Language.RW]: "Tangira Isuzuma",
  },
  quizComplete: {
    [Language.EN]: "Quiz Complete!",
    [Language.RW]: "Isuzuma Rirangiye!",
  },
  yourScore: {
    [Language.EN]: "You got {score} out of {total} correct!",
    [Language.RW]: "Wabonye {score} kuri {total}!",
  },

  // Sound Recording
  customSounds: {
    [Language.EN]: "Custom Sounds",
    [Language.RW]: "Amajwi Yihariye",
  },
  recordNoteSoundsDesc: {
    [Language.EN]: "Record your own voice for the music counting game.",
    [Language.RW]: "Fata ijwi ryawe ryifashishwe mu mukino wo kubara amanota.",
  },
  manageSounds: {
    [Language.EN]: "Manage Sounds",
    [Language.RW]: "Genzura Amajwi",
  },
  record: {
    [Language.EN]: "Record",
    [Language.RW]: "Fata Ijwi",
  },
  stop: {
    [Language.EN]: "Stop",
    [Language.RW]: "Hagarika",
  },
  play: {
    [Language.EN]: "Play",
    [Language.RW]: "Umva",
  },
  recording: {
      [Language.EN]: "Recording...",
      [Language.RW]: "Birimo gufatwa...",
  },
  recordingFor: {
    [Language.EN]: "Recording for {track}...",
    [Language.RW]: "Urafata amajwi ya {track}...",
  },
  customMusic: {
    [Language.EN]: "Custom Music",
    [Language.RW]: "Umuziki Wihariye",
  },
  recordMusicDesc: {
    [Language.EN]: "Record your own background music for the menu and lessons.",
    [Language.RW]: "Fata umuziki wawe w'inyuma wo mu intangiriro n'uwo mu masomo.",
  },
  manageMusic: {
    [Language.EN]: "Manage Music",
    [Language.RW]: "Genzura Umuziki",
  },
  
  // Music Box
  musicBox: {
    [Language.EN]: "Music Box",
    [Language.RW]: "Agasanduku k'Amajwi",
  },
  musicBoxDescription: {
    [Language.EN]: "Listen to the music and sounds from the app.",
    [Language.RW]: "Umva imiziki n'amajwi byo muri porogaramu.",
  },
  backgroundMusic: {
    [Language.EN]: "Background Music",
    [Language.RW]: "Umuziki w'Inyuma",
  },
  soundEffects: {
    [Language.EN]: "Sound Effects",
    [Language.RW]: "Amajwi",
  },
  menuMusic: {
    [Language.EN]: "Menu Music",
    [Language.RW]: "Umuziki wo mu Intangiriro",
  },
  lessonMusic: {
    [Language.EN]: "Lesson Music",
    [Language.RW]: "Umuziki w'Isomo",
  },
  stopMusic: {
    [Language.EN]: "Stop Music",
    [Language.RW]: "Hagarika Umuziki",
  },

  // Downloads / File Manager
  downloads: {
    [Language.EN]: "Offline Files",
    [Language.RW]: "Amadosiye",
  },
  downloadsDescription: {
    [Language.EN]: "Manage your offline music, videos, and documents.",
    [Language.RW]: "Genzura umuziki, amashusho, n'inyandiko zawe.",
  },
  manageFiles: {
      [Language.EN]: "Manage Files",
      [Language.RW]: "Genzura Amadosiye",
  },
  activeTransfers: {
    [Language.EN]: "Active Transfers",
    [Language.RW]: "Ibiri gukorwa",
  },
  storedContent: {
    [Language.EN]: "Stored Content",
    [Language.RW]: "Ibibitse",
  },
  noFilesYet: {
    [Language.EN]: "No files stored yet.",
    [Language.RW]: "Nta dosiye irabitswe.",
  },
  download: {
    [Language.EN]: "Download",
    [Language.RW]: "Kurura",
  },
  delete: {
    [Language.EN]: "Delete",
    [Language.RW]: "Siba",
  },
  rename: {
    [Language.EN]: "Rename",
    [Language.RW]: "Hindura Izina",
  },
  cancel: {
    [Language.EN]: "Cancel",
    [Language.RW]: "Reka",
  },
  save: {
    [Language.EN]: "Save",
    [Language.RW]: "Bika",
  },
  enterNewName: {
    [Language.EN]: "Enter new name",
    [Language.RW]: "Shyiramo izina rishya",
  },
  confirmDelete: {
    [Language.EN]: "Are you sure you want to delete '{name}'?",
    [Language.RW]: "Urifuza gusiba '{name}'?",
  },
  lowStorageError: {
      [Language.EN]: "Download failed due to low storage space.",
      [Language.RW]: "Gukurura byanze kubera umwanya muto.",
  },
  downloadFailed: {
      [Language.EN]: "Download failed",
      [Language.RW]: "Gukurura byanze",
  },
};

export const LESSONS: Lesson[] = [
    { id: 'addition', type: LessonType.ADDITION, titleKey: 'addition', icon: PlusIcon },
    { id: 'subtraction', type: LessonType.SUBTRACTION, titleKey: 'subtraction', icon: MinusIcon },
    { id: 'counting', type: LessonType.COUNTING, titleKey: 'counting', icon: CountingIcon },
    { id: 'music_counting', type: LessonType.MUSIC_COUNTING, titleKey: 'musicCounting', icon: MusicNoteIcon },
];

export const LESSON_PROBLEMS: { [key in LessonType]?: { [key in Level]?: LessonProblem[] } } = {
    [LessonType.ADDITION]: {
        [Level.EASY]: [
            { id: 1, type: LessonType.ADDITION, operands: [1, 2], answer: 3, level: Level.EASY },
            { id: 2, type: LessonType.ADDITION, operands: [2, 2], answer: 4, level: Level.EASY },
            { id: 3, type: LessonType.ADDITION, operands: [3, 1], answer: 4, level: Level.EASY },
        ],
        [Level.MEDIUM]: [
            { id: 4, type: LessonType.ADDITION, operands: [5, 3], answer: 8, level: Level.MEDIUM },
            { id: 5, type: LessonType.ADDITION, operands: [4, 5], answer: 9, level: Level.MEDIUM },
            { id: 6, type: LessonType.ADDITION, operands: [6, 2], answer: 8, level: Level.MEDIUM },
        ],
        [Level.HARD]: [
            { id: 7, type: LessonType.ADDITION, operands: [8, 7], answer: 15, level: Level.HARD },
            { id: 8, type: LessonType.ADDITION, operands: [9, 5], answer: 14, level: Level.HARD },
            { id: 9, type: LessonType.ADDITION, operands: [6, 9], answer: 15, level: Level.HARD },
        ],
    },
    [LessonType.SUBTRACTION]: {
        [Level.EASY]: [
            { id: 10, type: LessonType.SUBTRACTION, operands: [3, 1], answer: 2, level: Level.EASY },
            { id: 11, type: LessonType.SUBTRACTION, operands: [4, 2], answer: 2, level: Level.EASY },
            { id: 12, type: LessonType.SUBTRACTION, operands: [2, 1], answer: 1, level: Level.EASY },
        ],
        [Level.MEDIUM]: [
            { id: 13, type: LessonType.SUBTRACTION, operands: [8, 3], answer: 5, level: Level.MEDIUM },
            { id: 14, type: LessonType.SUBTRACTION, operands: [9, 5], answer: 4, level: Level.MEDIUM },
            { id: 15, type: LessonType.SUBTRACTION, operands: [7, 2], answer: 5, level: Level.MEDIUM },
        ],
        [Level.HARD]: [
            { id: 16, type: LessonType.SUBTRACTION, operands: [15, 7], answer: 8, level: Level.HARD },
            { id: 17, type: LessonType.SUBTRACTION, operands: [12, 5], answer: 7, level: Level.HARD },
            { id: 18, type: LessonType.SUBTRACTION, operands: [18, 9], answer: 9, level: Level.HARD },
        ],
    },
    [LessonType.COUNTING]: {
        [Level.EASY]: [
            { id: 19, type: LessonType.COUNTING, answer: 3, level: Level.EASY },
            { id: 20, type: LessonType.COUNTING, answer: 5, level: Level.EASY },
            { id: 21, type: LessonType.COUNTING, answer: 4, level: Level.EASY },
        ],
        [Level.MEDIUM]: [
            { id: 22, type: LessonType.COUNTING, answer: 8, level: Level.MEDIUM },
            { id: 23, type: LessonType.COUNTING, answer: 7, level: Level.MEDIUM },
            { id: 24, type: LessonType.COUNTING, answer: 9, level: Level.MEDIUM },
        ],
        [Level.HARD]: [
            { id: 25, type: LessonType.COUNTING, answer: 13, level: Level.HARD },
            { id: 26, type: LessonType.COUNTING, answer: 16, level: Level.HARD },
            { id: 27, type: LessonType.COUNTING, answer: 11, level: Level.HARD },
        ],
    },
    [LessonType.MUSIC_COUNTING]: {
        [Level.EASY]: [
            { id: 28, type: LessonType.MUSIC_COUNTING, answer: 2, level: Level.EASY },
            { id: 29, type: LessonType.MUSIC_COUNTING, answer: 4, level: Level.EASY },
            { id: 30, type: LessonType.MUSIC_COUNTING, answer: 3, level: Level.EASY },
        ],
        [Level.MEDIUM]: [
            { id: 31, type: LessonType.MUSIC_COUNTING, answer: 6, level: Level.MEDIUM },
            { id: 32, type: LessonType.MUSIC_COUNTING, answer: 8, level: Level.MEDIUM },
            { id: 33, type: LessonType.MUSIC_COUNTING, answer: 5, level: Level.MEDIUM },
        ],
        [Level.HARD]: [
            { id: 34, type: LessonType.MUSIC_COUNTING, answer: 10, level: Level.HARD },
            { id: 35, type: LessonType.MUSIC_COUNTING, answer: 12, level: Level.HARD },
            { id: 36, type: LessonType.MUSIC_COUNTING, answer: 9, level: Level.HARD },
        ],
    },
};