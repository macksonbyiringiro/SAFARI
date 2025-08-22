import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const RestartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 9a9 9 0 0114.13-5.12M20 15a9 9 0 01-14.13 5.12" />
    </svg>
);


const RestartButton: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className }) => {
    const { playSound } = useAppContext();

    const handleClick = () => {
        playSound('CLICK');
        onClick();
    };

    return (
        <button
            onClick={handleClick}
            className={`absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-2.5 shadow-md transition-all hover:scale-110 active:scale-95 z-40 ${className}`}
            aria-label="Restart"
        >
            <RestartIcon />
        </button>
    );
};

export default RestartButton;
