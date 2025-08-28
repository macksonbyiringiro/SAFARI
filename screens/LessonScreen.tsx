import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, LessonProblem, LessonType, Level, OperationProblem, CountingProblem } from '../types';
import { LESSON_PROBLEMS } from '../constants';
import NumberPad from '../components/NumberPad';
import { soundService } from '../services/soundService';
import RestartButton from '../components/RestartButton';
import BackButton from '../components/BackButton';

// Helper to get problems
const getProblemsForSession = (type: LessonType, level: Level): LessonProblem[] => {
    const problems = LESSON_PROBLEMS[type]?.[level] || [];
    // Shuffle and take up to 3 for the lesson
    return [...problems].sort(() => 0.5 - Math.random()).slice(0, 3);
};

const BananaIcon = ({ className = 'w-12 h-12' }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.951 8.349a1.001 1.001 0 00-.816-1.551l-2.434-.353c-1.383-.2-2.736.035-4.01.692-2.072 1.07-3.63 2.87-4.573 5.097a1 1 0 001.732 1.002c.79-1.92 2.1-3.414 3.86-4.32a6.45 6.45 0 014.24-.73l2.436.353a1 1 0 00.965-1.187zm-4.34 5.21a1 1 0 001.365-1.458c-.126-.118-.255-.233-.387-.346a7.17 7.17 0 00-3.328-1.745l-1.42.206c-1.109.16-2.18.66-3.13 1.433-1.638 1.33-2.585 3.32-2.71 5.513a1 1 0 001.99.19c.105-1.803.87-3.415 2.21-4.532.96-.78 2.053-1.23 3.193-1.378l1.246-.183z" />
  </svg>
);

const MusicNoteIcon = ({ className = 'w-12 h-12' }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" />
    </svg>
);

const Tutorial: React.FC<{ lessonType: LessonType; onComplete: () => void; onBack: () => void; }> = ({ lessonType, onComplete, onBack }) => {
    const { t, playSound } = useAppContext();
    const [step, setStep] = useState(0);

    const getSteps = () => {
        switch (lessonType) {
            case LessonType.SUBTRACTION:
                return [
                    { textKey: 'subtractionIntro1', img: <div className="flex items-center space-x-2"><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /></div> },
                    { textKey: 'subtractionIntro2', img: <div className="text-9xl font-black text-red-600 drop-shadow-lg">-</div> },
                    { textKey: 'subtractionIntro3', img: <div className="text-6xl font-black text-yellow-500">5 - 2 = 3</div> },
                ];
            case LessonType.COUNTING:
                 return [
                    { textKey: 'countingIntro1', img: <img src="https://picsum.photos/seed/kiki/150" alt="Kiki the Monkey" className="w-36 h-36 rounded-full border-4 border-yellow-200" /> },
                    { textKey: 'countingIntro2', img: <div className="flex items-center space-x-2"><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /></div> },
                    { textKey: 'countingIntro3', img: <div className="text-6xl font-black text-yellow-500">?</div> },
                ];
            case LessonType.MUSIC_COUNTING:
                return [
                    { textKey: 'musicIntro1', img: <img src="https://picsum.photos/seed/kiki/150" alt="Kiki the Monkey" className="w-36 h-36 rounded-full border-4 border-yellow-200" /> },
                    { textKey: 'musicIntro2', img: <div className="flex items-center space-x-2"><MusicNoteIcon className="w-16 h-16 text-purple-500" /><MusicNoteIcon className="w-16 h-16 text-blue-500" /><MusicNoteIcon className="w-16 h-16 text-pink-500" /></div> },
                    { textKey: 'musicIntro3', img: <div className="text-6xl font-black text-purple-500">?</div> },
                ];
            case LessonType.ADDITION:
            default:
                return [
                    { textKey: 'monkeyIntro1', img: <img src="https://picsum.photos/seed/kiki/150" alt="Kiki the Monkey" className="w-36 h-36 rounded-full border-4 border-yellow-200" /> },
                    { textKey: 'monkeyIntro2', img: <div className="flex items-center space-x-2"><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /> <span className="text-4xl mx-2">+</span> <BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /><BananaIcon className="w-16 h-16 text-yellow-400" /></div> },
                    { textKey: 'monkeyIntro3', img: <div className="text-9xl font-black text-green-600 drop-shadow-lg">+</div> },
                    { textKey: 'monkeyIntro4', img: <div className="text-6xl font-black text-yellow-500">2 + 3 = 5</div> },
                ];
        }
    };
    
    const steps = getSteps();

    const handleNext = () => {
        playSound('CLICK');
        if (step < steps.length - 1) {
            setStep(s => s + 1);
        } else {
            onComplete();
        }
    };
    
    return (
        <div className="w-full h-full flex flex-col justify-between items-center p-8 text-center bg-lime-100">
            <BackButton onClick={onBack} />
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
    const { t, setScreen, currentLesson, currentLevel, playSound, customSounds } = useAppContext();
    const [stage, setStage] = useState<'TUTORIAL' | 'TASK'>('TUTORIAL');
    const [problems, setProblems] = useState<LessonProblem[]>([]);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<'CORRECT' | 'INCORRECT' | null>(null);

    const startLesson = useCallback(() => {
        if (currentLesson && currentLevel) {
            setProblems(getProblemsForSession(currentLesson.type, currentLevel));
            setCurrentProblemIndex(0);
            setUserInput('');
            setFeedback(null);
        }
    }, [currentLesson, currentLevel]);

    useEffect(() => {
        if (currentLesson && currentLevel) {
            startLesson();
        } else {
            // If no lesson/level is set, go back to selection.
            setScreen(Screen.LESSON_SELECTION);
        }
    }, [currentLesson, currentLevel, setScreen, startLesson]);

    const handleRestart = () => {
        startLesson();
    };
    
    const handleBack = () => {
        setScreen(Screen.LESSON_SELECTION);
    };

    if (!currentLesson || !currentLevel || problems.length === 0) {
        // Render loading or redirect
        return <div className="w-full h-full flex items-center justify-center bg-lime-100"><p>Loading lesson...</p></div>;
    }

    const problem = problems[currentProblemIndex];

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
            playSound('CORRECT');
            setFeedback('CORRECT');
            setTimeout(() => {
                if (currentProblemIndex < problems.length - 1) {
                    setCurrentProblemIndex(prev => prev + 1);
                    setFeedback(null);
                    setUserInput('');
                } else {
                    setScreen(Screen.REWARD);
                }
            }, 1500);
        } else {
            playSound('INCORRECT');
            setFeedback('INCORRECT');
            setTimeout(() => {
                setFeedback(null);
                setUserInput('');
            }, 1500);
        }
    };
    
    const handleNoteTap = (noteNumber: number) => {
        const soundKey = `music_note_${noteNumber}`;
        if (customSounds[soundKey]) {
            soundService.playCustomSound(customSounds[soundKey]);
        } else {
            playSound('CLICK');
        }
    };

    const getOperatorSymbol = () => {
        if(problem.type === LessonType.ADDITION) return '+';
        if(problem.type === LessonType.SUBTRACTION) return '-';
        return '';
    }

    const getQuestionText = () => {
        switch(problem.type) {
            case LessonType.COUNTING:
                return t('questionCounting');
            case LessonType.MUSIC_COUNTING:
                return t('questionMusic');
            default: // ADDITION, SUBTRACTION
                return t('questionCounting');
        }
    }
    
    const getSubtext = () => {
        if (problem.type === LessonType.MUSIC_COUNTING) {
            const hasCustomSounds = Object.keys(customSounds).some(k => k.startsWith('music_note_'));
            if (hasCustomSounds) {
                return t('tapToPlay');
            }
        }
        return null;
    }

    if (stage === 'TUTORIAL') {
        return <Tutorial lessonType={currentLesson.type} onComplete={() => setStage('TASK')} onBack={handleBack} />
    }
    
    const subtext = getSubtext();

    return (
        <div className="w-full h-full flex flex-col items-center justify-around p-4 bg-lime-100/80">
            <BackButton onClick={handleBack} />
            <RestartButton onClick={handleRestart} />
            <div className="w-full text-center">
                <p className="text-xl font-bold text-yellow-900">{getQuestionText()}</p>
                {subtext && <p className="text-md font-semibold text-green-700 animate-pulse mt-1">{subtext}</p>}
            </div>
            
            <div className="flex items-center justify-center flex-wrap gap-4 my-4 min-h-[120px]">
                {(problem.type === LessonType.COUNTING || problem.type === LessonType.MUSIC_COUNTING) && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {Array.from({ length: (problem as CountingProblem).answer }).map((_, i) =>
                            problem.type === LessonType.MUSIC_COUNTING
                                ? <button key={`count-${i}`} onClick={() => handleNoteTap(i + 1)} className="transform transition-transform active:scale-110"><MusicNoteIcon className="w-12 h-12 text-purple-500" /></button>
                                : <BananaIcon key={`count-${i}`} />
                        )}
                    </div>
                )}
                {(problem.type === LessonType.ADDITION || problem.type === LessonType.SUBTRACTION) && (
                    <>
                        <div className="flex flex-wrap justify-center gap-2">
                            {Array.from({ length: (problem as OperationProblem).operands[0] }).map((_, i) => <BananaIcon key={`op1-${i}`} />)}
                        </div>
                        <div className={`text-6xl font-black ${problem.type === LessonType.ADDITION ? 'text-green-600' : 'text-red-600'}`}>{getOperatorSymbol()}</div>
                        <div className="flex flex-wrap justify-center gap-2">
                            {Array.from({ length: (problem as OperationProblem).operands[1] }).map((_, i) => <BananaIcon key={`op2-${i}`} />)}
                        </div>
                    </>
                )}
            </div>

            <div className="w-full max-w-sm">
                <div className="relative bg-white rounded-full h-20 flex items-center justify-center shadow-inner mb-4 overflow-hidden">
                    <span className={`text-5xl font-bold text-gray-700 transition-opacity duration-200 ${feedback ? 'opacity-0' : 'opacity-100'}`}>{userInput || '?'}</span>
                    {feedback && (
                        <div className={`absolute inset-0 rounded-full flex items-center justify-center text-white font-bold text-2xl
                            ${feedback === 'CORRECT' ? 'bg-green-500/90 animate-slow-zoom' : 'bg-red-500/90 animate-shake-lesson'}`}>
                            {feedback === 'CORRECT' ? t('correct') : t('tryAgain')}
                        </div>
                    )}
                </div>
                <NumberPad onInput={handleInput} onBackspace={handleBackspace} onSubmit={handleSubmit} />
                <style>{`
                    @keyframes slow-zoom {
                        from { transform: scale(0.4); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                    .animate-slow-zoom {
                        animation: slow-zoom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                    }
                    @keyframes shake-lesson {
                        10%, 90% { transform: translate3d(-1px, 0, 0); }
                        20%, 80% { transform: translate3d(2px, 0, 0); }
                        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                        40%, 60% { transform: translate3d(4px, 0, 0); }
                    }
                    .animate-shake-lesson {
                        animation: shake-lesson 0.82s cubic-bezier(.36,.07,.19,.97) both;
                    }
                `}</style>
            </div>

        </div>
    );
};

export default LessonScreen;
