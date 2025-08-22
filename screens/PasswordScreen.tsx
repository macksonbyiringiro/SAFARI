import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';
import NumberPad from '../components/NumberPad';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
);


const PasswordScreen: React.FC = () => {
    const { t, setScreen, playSound } = useAppContext();
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    
    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 15) + 5; // 5-19
        const num2 = Math.floor(Math.random() * 15) + 5; // 5-19
        return { num1, num2, answer: num1 + num2 };
    };
    
    const [question, setQuestion] = useState(generateQuestion);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
                setInput('');
                setQuestion(generateQuestion()); // Generate a new question
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleInput = (n: number) => {
        if (error) return;
        // Limit input length to 2 digits as answer will be < 40
        if (input.length < 2) {
            setInput(prev => prev + n.toString());
        }
    };

    const handleBackspace = () => {
        if (error) return;
        setInput(prev => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (parseInt(input, 10) === question.answer) {
            playSound('CORRECT');
            setScreen(Screen.PARENTS);
        } else {
            playSound('INCORRECT');
            setError(true);
        }
    };

    const handleBack = () => {
        playSound('CLICK');
        setScreen(Screen.HOME);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-6 bg-lime-100/80">
            <div className="w-full flex justify-start">
                <button onClick={handleBack} className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-bold text-gray-700">{t('back')}</span>
                </button>
            </div>
            
            <div className="flex flex-col items-center text-center">
                <LockIcon />
                <h1 className="text-3xl font-black text-yellow-900 mt-4">{t('passwordTitle')}</h1>
                <p className="text-lg text-gray-600 mt-2">{t('passwordPrompt')}</p>
                
                <div className="text-4xl font-bold text-yellow-900 my-4 tracking-wider" aria-live="polite">
                    {`${question.num1} + ${question.num2} = ?`}
                </div>

                <div className={`relative mt-2 w-52 h-16 bg-white rounded-2xl shadow-inner flex items-center justify-center p-2 transition-all duration-300 ${error ? 'animate-shake' : ''}`}>
                    {error ? (
                        <div className="absolute inset-0 rounded-2xl flex items-center justify-center text-white font-bold text-xl bg-red-500/90">
                            {t('passwordIncorrect')}
                        </div>
                    ) : (
                       <span className="text-4xl font-bold text-gray-700">{input || '?'}</span>
                    )}
                </div>
                <style>{`
                    @keyframes shake {
                        10%, 90% { transform: translate3d(-1px, 0, 0); }
                        20%, 80% { transform: translate3d(2px, 0, 0); }
                        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                        40%, 60% { transform: translate3d(4px, 0, 0); }
                    }
                    .animate-shake {
                        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
                    }
                `}</style>
            </div>
            
            <div className="w-full max-w-sm">
                <NumberPad onInput={handleInput} onBackspace={handleBackspace} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default PasswordScreen;