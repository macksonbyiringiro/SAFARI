
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Language, Screen, LocalizationStrings } from '../types';
import { LOCALIZATION_STRINGS } from '../constants';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  screen: Screen;
  setScreen: (screen: Screen) => void;
  t: (key: keyof LocalizationStrings) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [screen, setScreen] = useState<Screen>(Screen.HOME);

  const t = useCallback((key: keyof LocalizationStrings): string => {
    return LOCALIZATION_STRINGS[key][language];
  }, [language]);

  const value = {
    language,
    setLanguage,
    screen,
    setScreen,
    t,
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
