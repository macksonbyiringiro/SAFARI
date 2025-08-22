import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, Language, Level } from '../types';

const MusicIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" />
  </svg>
);

const SfxIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
  </svg>
);

const MicIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm5 10.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM10 18a.5.5 0 00.5-.5v-2a.5.5 0 00-1 0v2A.5.5 0 0010 18zm-3-1.5a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zm6 0a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5z" clipRule="evenodd" />
    <path d="M10 15a5 5 0 005-5V4a5 5 0 00-10 0v6a5 5 0 005 5z" />
  </svg>
);


const ParentDashboard: React.FC = () => {
  const { t, setScreen, playSound, musicVolume, setMusicVolume, sfxVolume, setSfxVolume, language, setLanguage, defaultLevel, setDefaultLevel } = useAppContext();

  const handleBack = () => {
      playSound('CLICK');
      setScreen(Screen.HOME);
  }

  return (
    <div className="w-full h-full flex flex-col p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex-shrink-0 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-900">{t('parentTitle')}</h1>
        <button onClick={handleBack} className="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto mt-4 space-y-6">
        <div>
            <p className="text-gray-600 mb-4">{t('parentDescription')}</p>
        </div>

        {/* App Settings */}
        <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-yellow-900 mb-4">{t('appSettings')}</h2>
            
            {/* Language Settings */}
            <div className="mb-6">
                <h3 className="font-bold text-lg text-yellow-800 mb-2">{t('languageSetting')}</h3>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setLanguage(Language.EN)}
                        aria-pressed={language === Language.EN}
                        className={`flex-1 p-2 rounded-md font-bold transition-colors ${language === Language.EN ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        English
                    </button>
                    <button 
                        onClick={() => setLanguage(Language.RW)}
                        aria-pressed={language === Language.RW}
                        className={`flex-1 p-2 rounded-md font-bold transition-colors ${language === Language.RW ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                        Kinyarwanda
                    </button>
                </div>
            </div>

            {/* Default Difficulty */}
            <div className="mb-6">
                <h3 className="font-bold text-lg text-yellow-800 mb-2">{t('defaultDifficulty')}</h3>
                <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setDefaultLevel(Level.EASY)} aria-pressed={defaultLevel === Level.EASY} className={`p-2 rounded-md font-bold transition-colors ${defaultLevel === Level.EASY ? 'bg-green-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{t('easy')}</button>
                    <button onClick={() => setDefaultLevel(Level.MEDIUM)} aria-pressed={defaultLevel === Level.MEDIUM} className={`p-2 rounded-md font-bold transition-colors ${defaultLevel === Level.MEDIUM ? 'bg-yellow-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{t('medium')}</button>
                    <button onClick={() => setDefaultLevel(Level.HARD)} aria-pressed={defaultLevel === Level.HARD} className={`p-2 rounded-md font-bold transition-colors ${defaultLevel === Level.HARD ? 'bg-red-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{t('hard')}</button>
                    <button onClick={() => setDefaultLevel(null)} aria-pressed={defaultLevel === null} className={`p-2 rounded-md font-bold transition-colors ${defaultLevel === null ? 'bg-blue-500 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>{t('allowChoice')}</button>
                </div>
            </div>
            
            {/* Audio Settings */}
            <div>
                <h3 className="font-bold text-lg text-yellow-800 mb-2">{t('audioSettings')}</h3>
                <div className="space-y-4">
                    {/* Music Volume */}
                    <div className="flex items-center gap-3">
                        <MusicIcon />
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05" 
                            value={musicVolume} 
                            onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            aria-label="Music volume"
                        />
                    </div>
                    {/* SFX Volume */}
                    <div className="flex items-center gap-3">
                        <SfxIcon />
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.05" 
                            value={sfxVolume} 
                            onChange={(e) => setSfxVolume(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            aria-label="Sound effects volume"
                        />
                    </div>
                </div>
            </div>
        </div>

        {/* Custom Sounds */}
        <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-yellow-900 mb-2">{t('customSounds')}</h2>
            <p className="text-gray-600 mb-4">{t('recordNoteSoundsDesc')}</p>
            <button 
                onClick={() => { playSound('CLICK'); setScreen(Screen.RECORD_SOUND); }}
                className="w-full bg-purple-500 text-white font-bold p-3 rounded-lg shadow-md hover:bg-purple-600 transition-colors flex items-center justify-center gap-2">
                <MicIcon />
                <span>{t('manageSounds')}</span>
            </button>
        </div>

        {/* Music Box */}
        <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-yellow-900 mb-2">{t('musicBox')}</h2>
            <p className="text-gray-600 mb-4">{t('musicBoxDescription')}</p>
            <button 
                onClick={() => { playSound('CLICK'); setScreen(Screen.MUSIC_BOX); }}
                className="w-full bg-teal-500 text-white font-bold p-3 rounded-lg shadow-md hover:bg-teal-600 transition-colors flex items-center justify-center gap-2">
                <MusicIcon />
                <span>{t('musicBox')}</span>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;