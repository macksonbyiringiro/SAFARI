
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';
import LanguageToggle from '../components/LanguageToggle';

const MonkeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v2.586l-1.293-1.293a1 1 0 10-1.414 1.414L8.586 9H6a1 1 0 100 2h2.586l-2.293 2.293a1 1 0 101.414 1.414L10 12.414V15a1 1 0 102 0v-2.586l2.293 2.293a1 1 0 101.414-1.414L13.414 11H16a1 1 0 100-2h-2.586l2.293-2.293a1 1 0 10-1.414-1.414L12 6.586V4a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
)

const HomeScreen: React.FC = () => {
    const { t, setScreen, playSound } = useAppContext();

    const handleStart = () => {
        playSound('CLICK');
        setScreen(Screen.LESSON_SELECTION);
    };

    const handleQuiz = () => {
        playSound('CLICK');
        setScreen(Screen.QUIZ_INTRO);
    };

    const handleParents = () => {
        playSound('CLICK');
        setScreen(Screen.PASSWORD);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-transparent text-center">
            <LanguageToggle />
            <div className="absolute top-1/4 transform -translate-y-1/2">
                <h1 className="text-5xl font-black text-yellow-900 drop-shadow-lg">{t('appTitle')}</h1>
                <h2 className="text-2xl font-bold text-green-700">{t( 'appTitle' ) === "Math Safari" ? 'Umenya Imibare!' : 'Math Safari' }</h2>
            </div>
            
            <div className="text-yellow-900 -mt-12">
                <div className="w-48 h-48 bg-yellow-200 rounded-full flex items-center justify-center border-8 border-yellow-300 shadow-2xl">
                    <MonkeyIcon />
                </div>
            </div>

            <div className="mt-12 space-y-5 w-full max-w-xs">
                <button 
                    onClick={handleStart} 
                    className="w-full bg-yellow-400 text-yellow-900 font-bold text-2xl py-4 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-yellow-500 active:border-b-2">
                    {t('startLesson')}
                </button>
                <button 
                    onClick={handleQuiz} 
                    className="w-full bg-blue-500 text-white font-bold text-2xl py-4 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-700 active:border-b-2">
                    {t('practiceQuiz')}
                </button>
                <button 
                    onClick={handleParents} 
                    className="w-full bg-green-500 text-white font-bold text-xl py-3 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-green-700 active:border-b-2">
                    {t('parentsCorner')}
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;