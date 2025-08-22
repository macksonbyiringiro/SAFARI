
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';

const QuizIntroScreen: React.FC = () => {
    const { t, setScreen, playSound } = useAppContext();

    const handleStart = () => {
        playSound('CLICK');
        setScreen(Screen.QUIZ_TASK);
    };
    
    const handleBack = () => {
        playSound('CLICK');
        setScreen(Screen.HOME);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-6 bg-lime-100/90 backdrop-blur-sm">
             <div className="w-full flex justify-start">
                 <button onClick={handleBack} className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-bold text-gray-700">{t('back')}</span>
                </button>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <img src="https://picsum.photos/seed/kiki/150" alt="Kiki the Monkey" className="w-36 h-36 rounded-full border-4 border-yellow-200 shadow-xl mb-6" />
                <h1 className="text-4xl font-black text-yellow-900 drop-shadow-lg mb-2">{t('quizIntroTitle')}</h1>
                <p className="text-xl font-bold text-green-700 max-w-xs">{t('quizIntroDescription')}</p>
            </div>
            
            <div className="w-full max-w-sm">
                <button 
                    onClick={handleStart} 
                    className="w-full bg-blue-500 text-white font-bold text-2xl py-4 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-blue-700 active:border-b-2">
                    {t('startQuiz')}
                </button>
            </div>
        </div>
    );
};

export default QuizIntroScreen;
