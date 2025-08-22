
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, AdditionProblem } from '../types';
import { ADDITION_PROBLEMS } from '../constants';
import NumberPad from '../components/NumberPad';

const BananaIcon = ({ className = 'w-12 h-12' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.951 8.349a1.001 1.001 0 00-.816-1.551l-2.434-.353c-1.383-.2-2.736.035-4.01.692-2.072 1.07-3.63 2.87-4.573 5.097a1 1 0 001.732 1.002c.79-1.92 2.1-3.414 3.86-4.32a6.45 6.45 0 014.24-.73l2.436.353a1 1 0 00.965-1.187zm-4.34 5.21a1 1 0 001.365-1.458c-.126-.118-.255-.233-.387-.346a7.17 7.17 0 00-3.328-1.745l-1.42.206c-1.109.16-2.18.66-3.13 1.433-1.638 1.33-2.585 3.32-2.71 5.513a1 1 0 001.99.19c.105-1.803.87-3.415 2.21-4.532.96-.78 2.053-1.23 3.193-1.378l1.246-.183z" />
  </svg>
);

const Tutorial: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const { t } = useAppContext();
    const [step, setStep] = useState(0);
    const steps = [
        { textKey: 'monkeyIntro1', img: <img src="https://picsum.photos/seed/kiki/150" alt="Kiki the Monkey" className="w-36 h-36 rounded-full border-4 border-yellow-200" /> },
        { textKey: 'monkeyIntro2', img: <div className="flex items-center space-x-2"><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /> <span className="text-4xl mx-2">+</span> <BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /></div> },
        { textKey: 'monkeyIntro3', img: <div className="text-9xl font-black text-green-600 drop-shadow-lg">+</div> },
        { textKey: 'monkeyIntro4', img: <div className="text-6xl font-black text-yellow-500">2 + 3 = 5</div> },
    ];

    const handleNext = () => {
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        } else {
            onComplete();
        }
    };
    
    return (
        <div className="w-full h-full flex flex-col justify-between items-center p-8 text-center bg-lime-100">
            <div className="flex-grow flex items-center justify-center">
                {steps[step].img}
            </div>
            <p className="text-2xl font-bold text-yellow-900 my-8 min-h-[100px]">{t(steps[step].textKey)}</p>
            <button onClick={handleNext} className="w-full max-w-xs bg-yellow-400 text-yellow-900 font-bold text-2xl py-3 rounded-full shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 border-yellow-500 active:border-b-2">
                {step === steps.length - 1 ? t('start') : t('next')}
            </button>
        </div>
    )
};


const LessonScreen: React.FC = () => {
    const { t, setScreen } = useAppContext();
    const [stage, setStage] = useState<'TUTORIAL' | 'TASK'>('TUTORIAL');
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<'CORRECT' | 'INCORRECT' | null>(null);

    const problem = ADDITION_PROBLEMS[currentProblemIndex];

    const handleInput = (n: number) => {
        if (feedback) return;
        setUserInput(prev => prev + n.toString());
    };
    
    const handleBackspace = () => {
        if (feedback) return;
        setUserInput(prev => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (parseInt(userInput, 10) === problem.answer) {
            setFeedback('CORRECT');
            setTimeout(() => {
                if (currentProblemIndex < ADDITION_PROBLEMS.length - 1) {
                    // This logic is simple, for a real app we would move to the next problem.
                    // For this demo, completing one problem is enough to get the reward.
                    setScreen(Screen.REWARD); 
                } else {
                    setScreen(Screen.REWARD);
                }
            }, 1500);
        } else {
            setFeedback('INCORRECT');
            setTimeout(() => {
                setFeedback(null);
                setUserInput('');
            }, 1500);
        }
    };

    if (stage === 'TUTORIAL') {
        return <Tutorial onComplete={() => setStage('TASK')} />
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-around p-4 bg-lime-100/80">
            <div className="w-full text-center">
                <p className="text-xl font-bold text-yellow-900">How many bananas in total?</p>
            </div>
            
            <div className="flex items-center justify-center space-x-4 my-4">
                <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: problem.operands[0] }).map((_, i) => <BananaIcon key={`op1-${i}`} />)}
                </div>
                <div className="text-6xl font-black text-green-600">+</div>
                <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: problem.operands[1] }).map((_, i) => <BananaIcon key={`op2-${i}`} />)}
                </div>
            </div>

            <div className="w-full max-w-sm">
                <div className="relative bg-white rounded-full h-20 flex items-center justify-center shadow-inner mb-4">
                    <span className="text-5xl font-bold text-gray-700">{userInput || '?'}</span>
                    {feedback && (
                        <div className={`absolute inset-0 rounded-full flex items-center justify-center text-white font-bold text-2xl
                            ${feedback === 'CORRECT' ? 'bg-green-500/90' : 'bg-red-500/90'}`}>
                            {feedback === 'CORRECT' ? t('correct') : t('tryAgain')}
                        </div>
                    )}
                </div>
                <NumberPad onInput={handleInput} onBackspace={handleBackspace} onSubmit={handleSubmit} />
            </div>

        </div>
    );
};

export default LessonScreen;