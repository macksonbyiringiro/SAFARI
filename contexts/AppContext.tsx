import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Language, Screen, LocalizationStrings, Lesson, Level, StoredFile, ActiveTransfer } from '../types';
import { LOCALIZATION_STRINGS } from '../constants';
import { soundService } from '../services/soundService';
import { downloadService } from '../services/downloadService';

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
  storedFiles: StoredFile[];
  activeTransfers: ActiveTransfer[];
  downloadFile: (url: string, name: string, type: 'music' | 'video') => void;
  uploadFiles: (files: FileList) => void;
  deleteStoredFile: (id: string) => void;
  renameStoredFile: (id: string, newName: string) => void;
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
  
  const [storedFiles, setStoredFiles] = useState<StoredFile[]>([]);
  const [activeTransfers, setActiveTransfers] = useState<ActiveTransfer[]>([]);

  // Load stored files on init
  useEffect(() => {
    downloadService.getStoredFiles().then(files => {
      setStoredFiles(files);
    });
  }, []);

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

  const downloadFile = useCallback(async (url: string, name: string, type: 'music' | 'video') => {
    const id = `${type}-${Date.now()}`;
    const newDownload: ActiveTransfer = {
        id,
        name,
        direction: 'download',
        progress: 0,
        transferredSize: 0,
        totalSize: 0,
    };
    setActiveTransfers(prev => [...prev, newDownload]);

    try {
        await downloadService.downloadFile(id, url, name, type, ({ downloadedSize, totalSize }) => {
            const progress = totalSize > 0 ? Math.round((downloadedSize / totalSize) * 100) : 0;
            setActiveTransfers(prev => prev.map(d => 
                d.id === id ? { ...d, transferredSize: downloadedSize, totalSize, progress } : d
            ));
        });

        // On success
        const updatedFiles = await downloadService.getStoredFiles();
        setStoredFiles(updatedFiles);

    } catch (error: any) {
        console.error("Download failed in context", error);
        // Show error on the download item
        setActiveTransfers(prev => prev.map(d => 
            d.id === id ? { ...d, error: error.message || "Download failed" } : d
        ));
    } finally {
        // Remove from active transfers after a delay so user can see completion/error
        setTimeout(() => {
            setActiveTransfers(prev => prev.filter(d => d.id !== id));
        }, 5000);
    }
  }, []);

  const uploadFiles = useCallback(async (files: FileList) => {
    for (const file of Array.from(files)) {
        const id = `upload-${Date.now()}-${file.name}`;
        const newTransfer: ActiveTransfer = {
            id,
            name: file.name,
            direction: 'upload',
            progress: 0,
            transferredSize: 0,
            totalSize: file.size,
        };
        setActiveTransfers(prev => [...prev, newTransfer]);

        try {
            await downloadService.uploadFile(file, ({ loaded, total }) => {
                const progress = total > 0 ? Math.round((loaded / total) * 100) : 100;
                setActiveTransfers(prev => prev.map(t =>
                    t.id === id ? { ...t, transferredSize: loaded, totalSize: total, progress } : t
                ));
            });

            const updatedFiles = await downloadService.getStoredFiles();
            setStoredFiles(updatedFiles);

        } catch (error: any) {
            console.error("Upload failed in context", error);
            setActiveTransfers(prev => prev.map(t =>
                t.id === id ? { ...t, error: error.message || "Upload failed" } : t
            ));
        } finally {
            setTimeout(() => {
                setActiveTransfers(prev => prev.filter(t => t.id !== id));
            }, 5000);
        }
    }
  }, []);

  const deleteStoredFile = useCallback(async (id: string) => {
    await downloadService.deleteFile(id);
    const updatedFiles = await downloadService.getStoredFiles();
    setStoredFiles(updatedFiles);
  }, []);

  const renameStoredFile = useCallback(async (id: string, newName: string) => {
    await downloadService.renameFile(id, newName);
    const updatedFiles = await downloadService.getStoredFiles();
    setStoredFiles(updatedFiles);
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
    storedFiles,
    activeTransfers,
    downloadFile,
    uploadFiles,
    deleteStoredFile,
    renameStoredFile,
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