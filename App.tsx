import React, { useEffect } from 'react';
import { useAppContext } from './contexts/AppContext';
import { Screen } from './types';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import RewardScreen from './screens/RewardScreen';
import ParentDashboard from './screens/ParentDashboard';
import PasswordScreen from './screens/PasswordScreen';
import LessonSelectionScreen from './screens/LessonSelectionScreen';
import SoundToggle from './components/SoundToggle';
import { soundService } from './services/soundService';
import QuizIntroScreen from './screens/QuizIntroScreen';
import QuizScreen from './screens/QuizScreen';
import QuizResultsScreen from './screens/QuizResultsScreen';
import RecordSoundScreen from './screens/RecordSoundScreen';
import MusicBoxScreen from './screens/MusicBoxScreen';
import RecordMusicScreen from './screens/RecordMusicScreen';
import DownloadsScreen from './screens/DownloadsScreen';

function App() {
  const { screen, isMuted, musicVolume } = useAppContext();

  // Effect for background music
  useEffect(() => {
    switch (screen) {
        case Screen.HOME:
        case Screen.LESSON_SELECTION:
        case Screen.PARENTS:
        case Screen.PASSWORD:
        case Screen.QUIZ_INTRO:
        case Screen.RECORD_SOUND:
        case Screen.RECORD_MUSIC:
        case Screen.DOWNLOADS:
            soundService.playMusic('MENU');
            break;
        case Screen.LESSON:
        case Screen.QUIZ_TASK:
            soundService.playMusic('LESSON');
            break;
        case Screen.REWARD:
        case Screen.QUIZ_RESULTS:
        case Screen.MUSIC_BOX:
            soundService.playMusic('NONE');
            break;
        default:
            soundService.playMusic('NONE');
            break;
    }
    // The dependency on isMuted and musicVolume is important so that when the user unmutes or changes volume, music starts playing.
  }, [screen, isMuted, musicVolume]);

  const renderScreen = () => {
    switch (screen) {
      case Screen.HOME:
        return <HomeScreen />;
      case Screen.LESSON_SELECTION:
        return <LessonSelectionScreen />;
      case Screen.LESSON:
        return <LessonScreen />;
      case Screen.REWARD:
        return <RewardScreen />;
      case Screen.PASSWORD:
        return <PasswordScreen />;
      case Screen.PARENTS:
        return <ParentDashboard />;
      case Screen.QUIZ_INTRO:
        return <QuizIntroScreen />;
      case Screen.QUIZ_TASK:
        return <QuizScreen />;
      case Screen.QUIZ_RESULTS:
        return <QuizResultsScreen />;
      case Screen.RECORD_SOUND:
        return <RecordSoundScreen />;
      case Screen.MUSIC_BOX:
        return <MusicBoxScreen />;
      case Screen.RECORD_MUSIC:
        return <RecordMusicScreen />;
      case Screen.DOWNLOADS:
        return <DownloadsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="bg-lime-50 h-screen w-screen flex items-center justify-center">
      <div className="w-full h-full sm:w-[420px] sm:h-[800px] sm:rounded-3xl shadow-2xl bg-savannah bg-cover bg-center overflow-hidden relative">
        {/* Added a subtle pattern background */}
        <style>{`
          .bg-savannah {
            background-color: #f7fee7; /* lime-50 */
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a3e635' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          }
        `}</style>
        <SoundToggle />
        {renderScreen()}
      </div>
    </div>
  );
}

export default App;
