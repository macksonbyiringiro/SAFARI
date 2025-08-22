
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen, Lesson, Level } from '../types';
import { LESSONS } from '../constants';

const LevelButton: React.FC<{ level: Level, label: string, color: string, onClick: (level: Level) => void }> = ({ level, label, color, onClick }) => (
    <button
        onClick={() => onClick(level)}
        className={`w-full ${color} text-white font-bold text-2xl py-4 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95 border-b-8 active:border-b-2`}
    >
        {label}
    </button>
);

const LessonSelectionScreen: React.FC = () => {
    const { t, setScreen, setCurrentLesson, setCurrentLevel, playSound, defaultLevel } = useAppContext();
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

    const handleLessonSelect = (lesson: Lesson) => {
        playSound('CLICK');
        if (defaultLevel) {
            // If a default level is set from settings, skip level selection
            setCurrentLesson(lesson);
            setCurrentLevel(defaultLevel);
            setScreen(Screen.LESSON);
        } else {
            // Otherwise, show the level selection view
            setSelectedLesson(lesson);
        }
    };
    
    const handleLevelSelect = (level: Level) => {
        playSound('CLICK');
        if (selectedLesson) {
            setCurrentLesson(selectedLesson);
            setCurrentLevel(level);
            setScreen(Screen.LESSON);
        }
    };

    const handleBack = () => {
        playSound('CLICK');
        if (selectedLesson) {
            setSelectedLesson(null);
        } else {
            setScreen(Screen.HOME);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between p-6 bg-lime-100/90 backdrop-blur-sm">
            <div className="w-full flex justify-start">
                 <button onClick={handleBack} className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-bold text-gray-700">{t('back')}</span>
                </button>
            </div>
            
            <div className="flex-grow flex flex-col items-center justify-center w-full max-w-sm">
                {!selectedLesson ? (
                    <>
                        <h1 className="text-4xl font-black text-yellow-900 text-center mb-8">{t('chooseLesson')}</h1>
                        <div className="space-y-5 w-full">
                            {LESSONS.map(lesson => (
                                <button
                                    key={lesson.id}
                                    onClick={() => handleLessonSelect(lesson)}
                                    className="w-full bg-white text-yellow-900 font-bold text-2xl py-4 rounded-2xl shadow-lg flex items-center justify-center gap-4 transform transition-all hover:scale-105 active:scale-95 border-b-8 border-gray-200 active:border-b-2"
                                >
                                    <lesson.icon className="w-10 h-10 text-green-500" />
                                    <span>{t(lesson.titleKey)}</span>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-black text-yellow-900 text-center mb-2">{t(selectedLesson.titleKey)}</h1>
                        <p className="text-2xl font-bold text-green-700 mb-8">{t('chooseLevel')}</p>
                        <div className="space-y-5 w-full">
                            <LevelButton level={Level.EASY} label={t('easy')} color="bg-green-500 border-green-700" onClick={handleLevelSelect} />
                            <LevelButton level={Level.MEDIUM} label={t('medium')} color="bg-yellow-500 border-yellow-700" onClick={handleLevelSelect} />
                            <LevelButton level={Level.HARD} label={t('hard')} color="bg-red-500 border-red-700" onClick={handleLevelSelect} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LessonSelectionScreen;
