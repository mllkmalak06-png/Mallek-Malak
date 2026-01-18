
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-gray-200">
      <button
        onClick={() => onToggle('en')}
        className={`px-3 py-1 text-sm font-medium transition-all rounded-md ${
          currentLang === 'en' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onToggle('ar')}
        className={`px-3 py-1 text-sm font-medium transition-all rounded-md ${
          currentLang === 'ar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        العربية
      </button>
    </div>
  );
};
