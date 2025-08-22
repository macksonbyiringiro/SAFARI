import React, { useState, useRef } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Screen } from '../types';
import { soundService } from '../services/soundService';

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const RecordSoundScreen: React.FC = () => {
    const { t, setScreen, customSounds, setCustomSound, deleteCustomSound, playSound } = useAppContext();
    const [isRecording, setIsRecording] = useState(false);
    const [recordingFor, setRecordingFor] = useState<number | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const handleRecordClick = async (num: number) => {
        if (isRecording) {
            // Stop current recording
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            setRecordingFor(null);
            playSound('CLICK');
        } else {
            // Start a new recording
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                playSound('CLICK');
                mediaRecorderRef.current = new MediaRecorder(stream);
                audioChunksRef.current = [];
                
                mediaRecorderRef.current.ondataavailable = event => {
                    audioChunksRef.current.push(event.data);
                };
                
                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    const reader = new FileReader();
                    reader.readAsDataURL(audioBlob);
                    reader.onloadend = () => {
                        const base64data = reader.result as string;
                        setCustomSound(`music_note_${num}`, base64data);
                    };
                    // Stop all media tracks to turn off mic indicator
                    stream.getTracks().forEach(track => track.stop());
                };
                
                mediaRecorderRef.current.start();
                setIsRecording(true);
                setRecordingFor(num);
            } catch (err) {
                console.error("Error accessing microphone:", err);
                alert("Could not access microphone. Please check permissions in your browser settings.");
            }
        }
    };

    const handlePlayClick = (num: number) => {
        const soundKey = `music_note_${num}`;
        if (customSounds[soundKey]) {
            soundService.playCustomSound(customSounds[soundKey]);
        }
    };

    const handleDownloadClick = (num: number) => {
        playSound('CLICK');
        const soundKey = `music_note_${num}`;
        const dataUrl = customSounds[soundKey];
        if (dataUrl) {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `math-safari-sound-${num}.webm`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleDeleteClick = (num: number) => {
        playSound('CLICK');
        const soundKey = `music_note_${num}`;
        if (window.confirm(`Are you sure you want to delete the sound for number ${num}?`)) {
            deleteCustomSound(soundKey);
        }
    }

    const handleBack = () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            setRecordingFor(null);
        }
        playSound('CLICK');
        setScreen(Screen.PARENTS);
    };
    
    const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className="w-full h-full flex flex-col p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex-shrink-0 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-yellow-900">{t('customSounds')}</h1>
                <button onClick={handleBack} className="bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-md flex items-center gap-2 px-4 transition-all hover:scale-105 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-bold text-gray-700">{t('back')}</span>
                </button>
            </div>
            
            <div className="flex-grow overflow-y-auto mt-4 space-y-3">
                {isRecording && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4" role="alert">
                        <p className="font-bold animate-pulse">{t('recording')} ({recordingFor})</p>
                    </div>
                )}
                {numbers.map(num => {
                    const soundKey = `music_note_${num}`;
                    const hasSound = !!customSounds[soundKey];
                    const isCurrentlyRecordingThis = isRecording && recordingFor === num;

                    return (
                        <div key={num} className="bg-lime-50 p-3 rounded-lg shadow-inner flex items-center justify-between gap-2">
                            <span className="text-3xl font-bold text-yellow-900 w-10">{num}</span>
                            <div className="flex-grow flex items-center gap-2">
                                <button
                                    onClick={() => handleRecordClick(num)}
                                    disabled={isRecording && !isCurrentlyRecordingThis}
                                    className={`px-4 py-2 rounded-lg font-bold text-white shadow-md transition-all ${
                                        isCurrentlyRecordingThis ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                                    } disabled:bg-gray-400 disabled:cursor-not-allowed`}
                                >
                                    {isCurrentlyRecordingThis ? t('stop') : t('record')}
                                </button>
                                {hasSound && (
                                    <>
                                        <button 
                                            onClick={() => handlePlayClick(num)} 
                                            disabled={isRecording}
                                            className="p-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 disabled:bg-gray-400"
                                            aria-label={`Play sound for ${num}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>
                                        </button>
                                        <button
                                            onClick={() => handleDownloadClick(num)}
                                            disabled={isRecording}
                                            className="p-2 bg-sky-500 text-white rounded-full shadow-md hover:bg-sky-600 disabled:bg-gray-400"
                                            aria-label={`Download sound for ${num}`}
                                        >
                                            <DownloadIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(num)}
                                            disabled={isRecording}
                                            className="p-2 bg-gray-400 text-white rounded-full shadow-md hover:bg-gray-500 disabled:bg-gray-400"
                                            aria-label={`Delete sound for ${num}`}
                                        >
                                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RecordSoundScreen;
