
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, GeneratedQuizQuestion } from '../types';
import { generateQuiz } from '../services/geminiService';

const ParentDashboard: React.FC = () => {
  const { t, setScreen } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<GeneratedQuizQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setError(null);
    setQuiz(null);
    try {
      const generatedQuiz = await generateQuiz();
      setQuiz(generatedQuiz);
    } catch (err) {
      setError(t('quizError'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-white/80 backdrop-blur-sm">
      <div className="flex-shrink-0 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-yellow-900">{t('parentTitle')}</h1>
        <button onClick={() => setScreen(Screen.HOME)} className="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto mt-4">
        <p className="text-gray-600 mb-6">{t('parentDescription')}</p>
        
        <button
          onClick={handleGenerateQuiz}
          disabled={isLoading}
          className="w-full bg-green-500 text-white font-bold text-lg py-3 rounded-lg shadow-md transform transition-all hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed border-b-4 border-green-700 active:border-b-2"
        >
          {isLoading ? t('generating') : t('generateQuiz')}
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        
        {quiz && (
          <div className="mt-6 bg-lime-50 p-4 rounded-lg shadow-inner">
            <h2 className="text-xl font-bold text-yellow-900 mb-4">{t('quizTitle')}</h2>
            <ul className="space-y-3">
              {quiz.map((item, index) => (
                <li key={index} className="bg-white p-3 rounded-md shadow">
                  <p className="text-gray-800">{`${index + 1}. ${item.question}`}</p>
                  <p className="font-bold text-green-600">Answer: {item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParentDashboard;
