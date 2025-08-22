
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Language } from '../types';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useAppContext();

  const toggleLanguage = () => {
    const newLang = language === Language.EN ? Language.RW : Language.EN;
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="absolute top-4 right-4 bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-md transition-all hover:scale-110 active:scale-95"
    >
      <div className="relative w-20 h-8 flex items-center">
        <div
          className={`absolute top-0 left-0 w-10 h-8 bg-yellow-400 rounded-full shadow-lg transform transition-transform duration-300 ease-in-out ${
            language === Language.RW ? 'translate-x-10' : 'translate-x-0'
          }`}
        ></div>
        <div className="w-10 text-center z-10 font-bold text-gray-700">EN</div>
        <div className="w-10 text-center z-10 font-bold text-gray-700">RW</div>
      </div>
    </button>
  );
};

export default LanguageToggle;
