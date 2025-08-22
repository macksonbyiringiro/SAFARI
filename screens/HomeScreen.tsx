
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';
import LanguageToggle from '../components/LanguageToggle';

const MonkeyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v2.586l-1.293-1.293a1 1 0 10-1.414 1.414L8.586 9H6a1 1 0 100 2h2.586l-2.293 2.293a1 1 0 101.414 1.414L10 12.414V15a1 1 0 102 0v-2.586l2.293 2.293a1 1 0 101.414-1.414L13.414 11H16a1 1 0 100-2h-2.586l2.293-2.293a1 1 0 10-1.414-1.414L12 6.586V4a1 1 0 00-1-1h-1z" clipRule="evenodd" />
    </svg>
)

const HomeScreen: React.FC = () => {
    const { t, setScreen } = useAppContext();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-transparent text-center">
            <LanguageToggle />
            <div className="absolute top-1/4 transform -translate-y-1/2">
                <h1 className="text-5xl font-black text-yellow-900 drop-shadow-lg">{t('appTitle')}</h1>
                <h2 className="text-2xl font-bold text-green-700">{t( 'appTitle' ) === "Math Safari" ? 'Umenya Imibare!' : 'Math Safari' }</h2>
            </div>
            
            <div className="text-brown-700 -mt-12">
                <img src="https://picsum.photos/seed/monkey/200/200" alt="Happy Monkey" className="rounded-full w-48 h-48 object-cover border-8 border-yellow-300 shadow-2xl" />
            </div>

            <div className="mt-12 space-y-5 w-full max-w-xs">
                <button 
                    onClick={() => setScreen(Screen.LESSON)} 
                    className="w-full bg-yellow-400 text-yellow-900 font-bold text-2xl py-4 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-yellow-500 active:border-b-2">
                    {t('startLesson')}
                </button>
                <button 
                    onClick={() => setScreen(Screen.PASSWORD)} 
                    className="w-full bg-green-500 text-white font-bold text-xl py-3 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-green-700 active:border-b-2">
                    {t('parentsCorner')}
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;