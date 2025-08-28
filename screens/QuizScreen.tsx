import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, GeneratedQuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';
import NumberPad from '../components/NumberPad';
import RestartButton from '../components/RestartButton';
import BackButton from '../components/BackButton';

const LoadingSpinner = () => (
    <div className="w-16 h-16 border-8 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
  
const CrossIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const QuizScreen: React.FC = () => {
    const { t, setScreen, playSound, setQuizScore, setTotalQuizQuestions } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [quiz, setQuiz] = useState<GeneratedQuizQuestion[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState<'CORRECT' | 'INCORRECT' | null>(null);
    const [score, setScore] = useState(0);

    const fetchQuiz = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setQuiz(null); // Clear old quiz
        setCurrentQuestionIndex(0);
        setUserInput('');
        setFeedback(null);
        setScore(0);
        try {
            const generatedQuiz = await generateQuiz();
            setQuiz(generatedQuiz);
            setTotalQuizQuestions(generatedQuiz.length);
        } catch (err) {
            setError(t('quizError'));
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [t, setTotalQuizQuestions]);

    useEffect(() => {
        fetchQuiz();
    }, [fetchQuiz]);

    const handleRestart = () => {
        fetchQuiz();
    };

    const handleBack = () => {
        setScreen(Screen.QUIZ_INTRO);
    };

    const handleInput = (n: number) => {
        if (feedback) return;
        setUserInput(prev => prev + n.toString());
    };
    
    const handleBackspace = () => {
        if (feedback) return;
        setUserInput(prev => prev.slice(0, -1));
    };

    const handleSubmit = () => {
        if (!quiz) return;
        const problem = quiz[currentQuestionIndex];
        const isCorrect = parseInt(userInput, 10) === problem.answer;

        if (isCorrect) {
            playSound('CORRECT');
            setFeedback('CORRECT');
            setScore(s => s + 1);
        } else {
            playSound('INCORRECT');
            setFeedback('INCORRECT');
        }

        setTimeout(() => {
            if (currentQuestionIndex < quiz.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setFeedback(null);
                setUserInput('');
            } else {
                setQuizScore(isCorrect ? score + 1 : score);
                setScreen(Screen.QUIZ_RESULTS);
            }
        }, 1500);
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-lime-100/80 text-center">
                <LoadingSpinner />
                <p className="text-2xl font-bold text-yellow-900 mt-6">{t('generating')}</p>
            </div>
        );
    }
    
    if (error || !quiz) {
         return (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-red-100/80 text-center">
                <p className="text-2xl font-bold text-red-700">{error || 'An unknown error occurred.'}</p>
                 <button onClick={() => setScreen(Screen.HOME)} className="mt-8 bg-yellow-400 text-yellow-900 font-bold text-xl py-3 px-8 rounded-full shadow-lg">
                    {t('goBackHome')}
                </button>
            </div>
        );
    }

    const problem = quiz[currentQuestionIndex];

    return (
        <div className="w-full h-full flex flex-col items-center justify-around p-4 bg-lime-100/80">
            <BackButton onClick={handleBack} />
            <RestartButton onClick={handleRestart} />
            <div className="w-full text-center">
                <p className="text-lg font-bold text-gray-600">{`Question ${currentQuestionIndex + 1} of ${quiz.length}`}</p>
                <p className="text-2xl font-bold text-yellow-900 mt-4 leading-tight">{problem.question}</p>
            </div>
            
            <div className="w-full max-w-sm mt-4">
                <div className="relative bg-white rounded-full h-20 flex items-center justify-center shadow-inner mb-4 overflow-hidden">
                    <span className={`text-5xl font-bold text-gray-700 transition-opacity duration-200 ${feedback ? 'opacity-0' : 'opacity-100'}`}>{userInput || '?'}</span>
                    {feedback && (
                        <div
                            className={`absolute inset-0 rounded-full flex items-center justify-center gap-4 text-white font-bold text-2xl
                            ${feedback === 'CORRECT' ? 'bg-green-500/90 animate-slow-zoom' : 'bg-red-500/90 animate-shake-lesson'}`}
                            role="alert"
                        >
                            {feedback === 'CORRECT' ? <CheckIcon /> : <CrossIcon />}
                            <span>{feedback === 'CORRECT' ? t('correct') : t('tryAgain')}</span>
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

export default QuizScreen;