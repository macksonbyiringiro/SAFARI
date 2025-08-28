import React, { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';

const Star: React.FC<{ delay: number; visible: boolean }> = ({ delay, visible }) => {
    return (
        <div className={`${visible ? 'animate-bounce-in' : 'opacity-0'}`} style={{ animationDelay: `${delay}ms` }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-yellow-400 drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </div>
    );
};


const QuizResultsScreen: React.FC = () => {
    const { t, setScreen, playSound, quizScore, totalQuizQuestions } = useAppContext();

    useEffect(() => {
        playSound('REWARD');
    }, [playSound]);

    const handleGoHome = () => {
        playSound('CLICK');
        setScreen(Screen.HOME);
    };
    
    const scoreMessage = t('yourScore').replace('{score}', quizScore.toString()).replace('{total}', totalQuizQuestions.toString());
    
    // Determine number of stars to show based on percentage
    const percentage = totalQuizQuestions > 0 ? (quizScore / totalQuizQuestions) : 0;
    let starsToShow = 0;
    if (percentage > 0.8) starsToShow = 3;
    else if (percentage >= 0.5) starsToShow = 2;
    else if (percentage > 0) starsToShow = 1;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-lime-100/80 text-center">
            <h1 className="text-6xl font-black text-green-600 drop-shadow-lg mb-4">{t('quizComplete')}</h1>
            
            {/* Made the score display more prominent */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-inner mb-8">
                <h2 className="text-3xl font-bold text-yellow-900">{scoreMessage}</h2>
            </div>
            
            <div className="flex space-x-4 h-24 items-center">
                <Star delay={100} visible={starsToShow >= 1} />
                <div className="transform scale-125">
                    <Star delay={400} visible={starsToShow >= 2} />
                </div>
                <Star delay={700} visible={starsToShow >= 3} />
            </div>

            <button
                onClick={handleGoHome}
                className="mt-16 w-full max-w-xs bg-yellow-400 text-yellow-900 font-bold text-2xl py-3 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-yellow-500 active:border-b-2">
                {t('goBackHome')}
            </button>
            <style>{`
                @keyframes bounce-in {
                    0% { opacity: 0; transform: scale(.3) rotate(-30deg); }
                    50% { opacity: 1; transform: scale(1.1) rotate(10deg); }
                    70% { transform: scale(.9) rotate(-5deg); }
                    100% { transform: scale(1) rotate(0); }
                }
                .animate-bounce-in {
                    animation: bounce-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }
            `}</style>
        </div>
    );
};

export default QuizResultsScreen;