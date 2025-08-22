import React from 'react';
import { useAppContext } from '../contexts/AppContext';

const NumberPad: React.FC<{ onInput: (n: number) => void; onBackspace: () => void; onSubmit: () => void; }> = ({ onInput, onBackspace, onSubmit }) => {
    const { playSound } = useAppContext();
    const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const handleInput = (k: number) => {
        playSound('CLICK');
        onInput(k);
    };

    const handleBackspace = () => {
        playSound('CLICK');
        onBackspace();
    };

    const handleSubmit = () => {
        playSound('CLICK');
        onSubmit();
    };

    return (
        <div className="grid grid-cols-3 gap-3 p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-inner">
            {keys.map(k => (
                <button key={k} onClick={() => handleInput(k)} className="text-3xl font-bold text-gray-700 bg-white rounded-lg shadow-md h-16 active:bg-yellow-200 transition-colors">
                    {k}
                </button>
            ))}
            <button onClick={handleBackspace} className="text-xl font-bold text-gray-700 bg-white/80 rounded-lg shadow-md h-16 active:bg-red-200 transition-colors">⌫</button>
            <button onClick={() => handleInput(0)} className="text-3xl font-bold text-gray-700 bg-white rounded-lg shadow-md h-16 active:bg-yellow-200 transition-colors">0</button>
            <button onClick={handleSubmit} className="text-2xl font-bold text-white bg-green-500 rounded-lg shadow-md h-16 active:bg-green-600 transition-colors">OK</button>
        </div>
    );
};

export default NumberPad;