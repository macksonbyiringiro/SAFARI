import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';
import { soundService } from '../services/soundService';

const PlayIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const MusicBoxScreen: React.FC = () => {
    const { t, setScreen, playSound } = useAppContext();

    const handleBack = () => {
        soundService.stopMusic();
        playSound('CLICK');
        setScreen(Screen.PARENTS);
    };

    const handlePlayMusic = (type: 'MENU' | 'LESSON') => {
        playSound('CLICK');
        soundService.playMusic(type);
    };

    const handleStopMusic = () => {
        playSound('CLICK');
        soundService.stopMusic();
    };
    
    const handlePlaySfx = (type: 'CORRECT' | 'INCORRECT' | 'REWARD' | 'CLICK') => {
        playSound(type);
    }

    return (
        <div className="w-full h-full flex flex-col p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex-shrink-0 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-yellow-900">{t('musicBox')}</h1>
                <button onClick={handleBack} className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-bold text-gray-700">{t('back')}</span>
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto mt-4 space-y-6">
                {/* Background Music */}
                <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
                    <h2 className="text-xl font-bold text-yellow-900 mb-4">{t('backgroundMusic')}</h2>
                    <div className="space-y-3">
                        <button onClick={() => handlePlayMusic('MENU')} className="w-full flex items-center gap-3 text-left p-3 bg-white rounded-lg shadow-sm hover:bg-lime-100 transition-colors">
                            <PlayIcon /> <span className="font-semibold text-gray-700">{t('menuMusic')}</span>
                        </button>
                        <button onClick={() => handlePlayMusic('LESSON')} className="w-full flex items-center gap-3 text-left p-3 bg-white rounded-lg shadow-sm hover:bg-lime-100 transition-colors">
                            <PlayIcon /> <span className="font-semibold text-gray-700">{t('lessonMusic')}</span>
                        </button>
                        <button onClick={handleStopMusic} className="w-full p-3 bg-red-500 text-white font-bold rounded-lg shadow-sm hover:bg-red-600 transition-colors">
                           {t('stopMusic')}
                        </button>
                    </div>
                </div>

                {/* Sound Effects */}
                <div className="bg-lime-50 p-4 rounded-lg shadow-inner">
                    <h2 className="text-xl font-bold text-yellow-900 mb-4">{t('soundEffects')}</h2>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handlePlaySfx('CORRECT')} className="flex items-center justify-center gap-2 p-3 bg-green-200 text-green-800 font-semibold rounded-lg shadow-sm hover:bg-green-300 transition-colors">
                            <PlayIcon className="text-green-600"/> <span>{t('correct')}</span>
                        </button>
                        <button onClick={() => handlePlaySfx('INCORRECT')} className="flex items-center justify-center gap-2 p-3 bg-red-200 text-red-800 font-semibold rounded-lg shadow-sm hover:bg-red-300 transition-colors">
                            <PlayIcon className="text-red-600" /> <span>{t('tryAgain')}</span>
                        </button>
                         <button onClick={() => handlePlaySfx('REWARD')} className="flex items-center justify-center gap-2 p-3 bg-yellow-200 text-yellow-800 font-semibold rounded-lg shadow-sm hover:bg-yellow-300 transition-colors">
                            <PlayIcon className="text-yellow-500" /> <span>{t('wellDone')}</span>
                        </button>
                        <button onClick={() => handlePlaySfx('CLICK')} className="flex items-center justify-center gap-2 p-3 bg-blue-200 text-blue-800 font-semibold rounded-lg shadow-sm hover:bg-blue-300 transition-colors">
                           <PlayIcon className="text-blue-500" /> <span>{t('click')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MusicBoxScreen;