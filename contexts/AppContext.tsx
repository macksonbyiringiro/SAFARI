import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Language, Screen, LocalizationStrings, Lesson, Level } from '../types';
import { LOCALIZATION_STRINGS } from '../constants';
import { soundService } from '../services/soundService';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  t: (key: keyof LocalizationStrings) => string;
  currentLesson: Lesson | null;
  setCurrentLesson: (lesson: Lesson | null) => void;
  currentLevel: Level | null;
  setCurrentLevel: (level: Level | null) => void;
  isMuted: boolean;
  toggleSound: () => void;
  playSound: (type: 'CLICK' | 'CORRECT' | 'INCORRECT' | 'REWARD') => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  sfxVolume: number;
  setSfxVolume: (volume: number) => void;
  defaultLevel: Level | null;
  setDefaultLevel: (level: Level | null) => void;
  quizScore: number;
  setQuizScore: (score: number) => void;
  totalQuizQuestions: number;
  setTotalQuizQuestions: (total: number) => void;
  customSounds: { [key: string]: string; };
  setCustomSound: (key: string, dataUrl: string) => void;
  deleteCustomSound: (key: string) => void;
  customMusic: { [key in 'MENU' | 'LESSON']?: string };
  setCustomMusic: (type: 'MENU' | 'LESSON', dataUrl: string) => void;
  deleteCustomMusic: (type: 'MENU' | 'LESSON') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
    return (savedLang && Object.values(Language).includes(savedLang as Language)) ? savedLang as Language : Language.EN;
  });
  const [screen, setScreen] = useState<Screen>(Screen.HOME);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [isMuted, setIsMuted] = useState(soundService.getIsMuted());
  const [quizScore, setQuizScore] = useState(0);
  const [totalQuizQuestions, setTotalQuizQuestions] = useState(0);

  const [musicVolume, setMusicVolumeState] = useState<number>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('musicVolume') : null;
    return saved ? parseFloat(saved) : 0.4;
  });

  const [sfxVolume, setSfxVolumeState] = useState<number>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('sfxVolume') : null;
    return saved ? parseFloat(saved) : 0.6;
  });

  const [defaultLevel, setDefaultLevelState] = useState<Level | null>(() => {
    const savedLevel = typeof window !== 'undefined' ? localStorage.getItem('defaultLevel') : null;
    return (savedLevel && Object.values(Level).includes(savedLevel as Level)) ? savedLevel as Level : null;
  });

  const [customSounds, setCustomSoundsState] = useState<{ [key: string]: string; }>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('customSounds') : null;
    return saved ? JSON.parse(saved) : {};
  });

  const [customMusic, setCustomMusicState] = useState<{ [key in 'MENU' | 'LESSON']?: string }>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('customMusic') : null;
    return saved ? JSON.parse(saved) : {};
  });

  // Initialize sound service with volumes on component mount
  useEffect(() => {
    soundService.setMusicVolume(musicVolume);
    soundService.setSfxVolume(sfxVolume);
  }, []); // Empty dependency array ensures this runs only once
  
  // Update sound service with custom music tracks when they change
  useEffect(() => {
    soundService.setCustomMusic('MENU', customMusic.MENU || null);
    soundService.setCustomMusic('LESSON', customMusic.LESSON || null);
  }, [customMusic]);

  const t = useCallback((key: keyof LocalizationStrings): string => {
    return LOCALIZATION_STRINGS[key][language];
  }, [language]);

  const playSound = useCallback((type: 'CLICK' | 'CORRECT' | 'INCORRECT' | 'REWARD') => {
      soundService.playSound(type);
  }, []);

  const toggleSound = useCallback(() => {
    const newMutedState = soundService.toggleMute();
    setIsMuted(newMutedState);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguageState(lang);
  }, []);

  const setMusicVolume = useCallback((volume: number) => {
    localStorage.setItem('musicVolume', volume.toString());
    setMusicVolumeState(volume);
    soundService.setMusicVolume(volume);
  }, []);

  const setSfxVolume = useCallback((volume: number) => {
    localStorage.setItem('sfxVolume', volume.toString());
    setSfxVolumeState(volume);
    soundService.setSfxVolume(volume);
  }, []);

  const setDefaultLevel = useCallback((level: Level | null) => {
    if (level) {
        localStorage.setItem('defaultLevel', level);
    } else {
        localStorage.removeItem('defaultLevel');
    }
    setDefaultLevelState(level);
  }, []);

  const setCustomSound = useCallback((key: string, dataUrl: string) => {
    setCustomSoundsState(prev => {
        const newSounds = { ...prev, [key]: dataUrl };
        localStorage.setItem('customSounds', JSON.stringify(newSounds));
        return newSounds;
    });
  }, []);
  
  const deleteCustomSound = useCallback((key: string) => {
      setCustomSoundsState(prev => {
          const newSounds = { ...prev };
          delete newSounds[key];
          localStorage.setItem('customSounds', JSON.stringify(newSounds));
          return newSounds;
      });
  }, []);
  
  const setCustomMusic = useCallback((type: 'MENU' | 'LESSON', dataUrl: string) => {
    setCustomMusicState(prev => {
        const newMusic = { ...prev, [type]: dataUrl };
        localStorage.setItem('customMusic', JSON.stringify(newMusic));
        return newMusic;
    });
  }, []);
  
  const deleteCustomMusic = useCallback((type: 'MENU' | 'LESSON') => {
      setCustomMusicState(prev => {
          const newMusic = { ...prev };
          delete newMusic[type];
          localStorage.setItem('customMusic', JSON.stringify(newMusic));
          return newMusic;
      });
  }, []);

  const value = {
    language,
    setLanguage,
    screen,
    setScreen,
    t,
    currentLesson,
    setCurrentLesson,
    currentLevel,
    setCurrentLevel,
    isMuted,
    toggleSound,
    playSound,
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
    defaultLevel,
    setDefaultLevel,
    quizScore,
    setQuizScore,
    totalQuizQuestions,
    setTotalQuizQuestions,
    customSounds,
    setCustomSound,
    deleteCustomSound,
    customMusic,
    setCustomMusic,
    deleteCustomMusic,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};