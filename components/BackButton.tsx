import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const BackButton: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className }) => {
    const { t, playSound } = useAppContext();

    const handleClick = () => {
        playSound('CLICK');
        onClick();
    };

    return (
        <button onClick={handleClick} className={`absolute top-4 left-4 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95 z-40 ${className}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-bold text-gray-700">{t('back')}</span>
        </button>
    );
};

export default BackButton;
