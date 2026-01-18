
import React from 'react';
import { Step, Language } from '../types';
import { LOCALIZATION } from '../constants';

interface StepCardProps {
  step: Step;
  lang: Language;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
}

export const StepCard: React.FC<StepCardProps> = ({ step, lang, isCompleted, onToggleComplete }) => {
  const isRtl = lang === 'ar';
  const t = LOCALIZATION[lang];

  return (
    <div className={`relative pb-10 group ${isRtl ? 'pr-8 border-r' : 'pl-8 border-l'} border-gray-100 dark:border-gray-900 last:border-0 transition-all`}>
      {/* Timeline Dot */}
      <div className={`absolute top-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-950 shadow-sm transition-all duration-500 z-10 ${
        isCompleted ? 'bg-emerald-500 scale-125' : 'bg-blue-400 group-hover:bg-blue-500'
      } ${isRtl ? '-right-1.5' : '-left-1.5'}`} />
      
      {/* Floaty Card */}
      <div className={`bg-white dark:bg-gray-900/40 p-6 rounded-[2rem] border transition-all duration-500 backdrop-blur-sm ${
        isCompleted 
          ? 'border-emerald-100 dark:border-emerald-900/20 shadow-none opacity-60' 
          : 'border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1'
      }`}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onToggleComplete(step.id)}
              className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
                isCompleted 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : 'border-gray-100 dark:border-gray-800 hover:border-blue-300'
              }`}
            >
              {isCompleted && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <h3 className={`font-bold text-lg tracking-tight transition-colors ${
              isCompleted ? 'text-gray-400 dark:text-gray-600 line-through' : 'text-gray-900 dark:text-gray-100'
            }`}>
              {step.title}
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-full">
            {step.duration}
          </span>
        </div>
        
        <p className={`text-sm mb-5 leading-relaxed font-medium transition-colors ${
          isCompleted ? 'text-gray-400 dark:text-gray-700' : 'text-gray-500 dark:text-gray-400'
        }`}>
          {step.description}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            {step.isUniversityModule ? (
              <span className="text-[9px] uppercase tracking-tighter font-black px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
                {t.universityModulesTag}
              </span>
            ) : (
              <span className="text-[9px] uppercase tracking-tighter font-black px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-lg">
                {t.partneredAcademyTag}
              </span>
            )}
          </div>
          
          <a
            href={step.courseLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all"
          >
            {step.academyName}
            <svg className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};
