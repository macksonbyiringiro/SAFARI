
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';

const Star: React.FC<{ delay: number }> = ({ delay }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <div className={`transition-all duration-500 ${visible ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 -rotate-45'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-yellow-400 drop-shadow-lg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </div>
    );
};

const RewardScreen: React.FC = () => {
    const { t, setScreen } = useAppContext();

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-lime-100/80 text-center">
            <h1 className="text-6xl font-black text-green-600 drop-shadow-lg mb-4">{t('wellDone')}</h1>
            <h2 className="text-3xl font-bold text-yellow-900 mb-8">{t('youEarnedStars')}</h2>
            
            <div className="flex space-x-4">
                <Star delay={100} />
                <div className="transform scale-125">
                    <Star delay={400} />
                </div>
                <Star delay={700} />
            </div>

            <button
                onClick={() => setScreen(Screen.HOME)}
                className="mt-16 w-full max-w-xs bg-yellow-400 text-yellow-900 font-bold text-2xl py-3 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-yellow-500 active:border-b-2">
                {t('goBackHome')}
            </button>
        </div>
    );
};

export default RewardScreen;
