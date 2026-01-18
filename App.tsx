
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Language, 
  ProficiencyLevel, 
  LearningPathInput, 
  LearningPath 
} from './types';
import { LOCALIZATION } from './constants';
import { LanguageToggle } from './components/LanguageToggle';
import { StepCard } from './components/StepCard';
import { generateLearningPath } from './services/geminiService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [path, setPath] = useState<LearningPath | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  
  const [form, setForm] = useState<LearningPathInput>({
    goal: '',
    deadline: '',
    level: ProficiencyLevel.BEGINNER,
    availability: 10
  });

  const t = useMemo(() => LOCALIZATION[lang], [lang]);
  const isRtl = lang === 'ar';

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'availability' ? parseInt(value) || 0 : value }));
  };

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => 
      prev.includes(id) ? prev.filter(stepId => stepId !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCompletedSteps([]);
    try {
      const pathResult = await generateLearningPath(form, lang);
      setPath(pathResult);
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setError(err?.message || 'System unavailable. Please retry shortly.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = useMemo(() => {
    if (!path || path.steps.length === 0) return 0;
    return Math.round((completedSteps.length / path.steps.length) * 100);
  }, [path, completedSteps]);

  return (
    <div className={`min-h-screen transition-all duration-700 pb-20 bg-[#f8f9fc] dark:bg-black text-gray-900 dark:text-white ${isRtl ? 'rtl' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-40 px-6 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 px-6 py-3 rounded-full shadow-2xl shadow-gray-200/20 dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl shadow-blue-500/30">
              M
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-black tracking-tighter leading-none">{t.title}</h1>
              <p className="text-[9px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest mt-1">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-full bg-white dark:bg-gray-900 text-gray-400 hover:text-blue-500 hover:scale-110 active:scale-90 transition-all border border-gray-100 dark:border-gray-800 shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.243l.707.707M7.757 7.757l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            <LanguageToggle currentLang={lang} onToggle={setLang} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Section */}
        <section className="lg:col-span-4">
          <div className="bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white dark:border-gray-800 shadow-xl shadow-gray-200/40 dark:shadow-none lg:sticky lg:top-28 transition-all">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t.goalLabel}</label>
                <textarea
                  name="goal"
                  value={form.goal}
                  onChange={handleInputChange}
                  placeholder={t.goalPlaceholder}
                  className="w-full px-5 py-4 bg-gray-50/50 dark:bg-black/50 border border-gray-100 dark:border-gray-800 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none h-40 text-sm font-medium text-gray-900 dark:text-gray-100"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t.deadlineLabel}</label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-gray-50/50 dark:bg-black/50 border border-gray-100 dark:border-gray-800 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-xs font-bold text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">{t.levelLabel}</label>
                  <select
                    name="level"
                    value={form.level}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-gray-50/50 dark:bg-black/50 border border-gray-100 dark:border-gray-800 rounded-3xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-xs font-bold appearance-none text-gray-900 dark:text-gray-100 cursor-pointer"
                  >
                    <option value={ProficiencyLevel.BEGINNER}>{t.levels.beginner}</option>
                    <option value={ProficiencyLevel.INTERMEDIATE}>{t.levels.intermediate}</option>
                    <option value={ProficiencyLevel.ADVANCED}>{t.levels.advanced}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">
                  {t.availabilityLabel}: <span className="text-blue-600 dark:text-blue-400">{form.availability}h</span>
                </label>
                <input
                  type="range"
                  name="availability"
                  min="1"
                  max="40"
                  value={form.availability}
                  onChange={handleInputChange}
                  className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gray-900 dark:bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] hover:bg-black dark:hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 shadow-2xl shadow-gray-300 dark:shadow-none"
              >
                {loading ? t.generatingText : t.generateButton}
              </button>
            </form>

            {error && (
              <div className="mt-8 p-4 rounded-3xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-[10px] font-bold text-red-500 text-center uppercase tracking-widest">
                {error}
              </div>
            )}
          </div>
        </section>

        {/* Output Section */}
        <section id="results" className="lg:col-span-8">
          {!path && !loading && (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl shadow-gray-200/50 dark:shadow-none border border-white dark:border-gray-800">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-xl font-black tracking-tight text-gray-300 dark:text-gray-700 max-w-xs">{t.noData}</p>
            </div>
          )}

          {loading && (
            <div className="space-y-12">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse bg-white/50 dark:bg-gray-900/20 p-8 rounded-[3rem] border border-gray-100 dark:border-gray-900 h-48" />
              ))}
            </div>
          )}

          {path && !loading && (
            <div className="space-y-12">
              {/* Hero Banner with Summary */}
              <div className="relative p-10 rounded-[3.5rem] bg-white dark:bg-gray-900 border border-white dark:border-gray-800 shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-emerald-100 dark:border-emerald-900/30">
                      Validated Path
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tighter leading-tight mb-4">{path.summary}</h2>
                </div>
              </div>

              {/* Progress Panel */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-[2.5rem] border border-white dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{t.progressTitle}</h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black tracking-tighter">{progressPercentage}</span>
                      <span className="text-sm font-bold text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="w-24 h-24 relative">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-gray-800" />
                      <circle 
                        cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={2 * Math.PI * 40} 
                        strokeDashoffset={2 * Math.PI * 40 * (1 - progressPercentage / 100)} 
                        strokeLinecap="round"
                        className="text-blue-500 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-black text-gray-400">{completedSteps.length}/{path.steps.length}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Steps Timeline */}
              <div>
                <h3 className="text-[11px] font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.3em] mb-12 px-6">
                  {t.stepsTitle}
                </h3>
                <div className="space-y-0">
                  {path.steps.map((step, idx) => (
                    <StepCard 
                      key={step.id} 
                      step={step} 
                      lang={lang} 
                      isCompleted={completedSteps.includes(step.id)}
                      onToggleComplete={toggleStep}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 dark:bg-gray-950 p-12 rounded-[4rem] text-center border border-gray-800 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <p className="text-xl italic font-medium leading-relaxed text-gray-300 relative z-10">
                  "{path.forwardLookingSentence}"
                </p>
                <div className="mt-10 flex justify-center gap-6 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] relative z-10">
                  <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">Local Cloud</span>
                  <span className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">Neural Sync</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-32 py-12 border-t border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <span className="text-lg font-black tracking-tighter">MARI.DZ</span>
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-800" />
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
              Algiers Technical Hub &bull; 2024
            </p>
          </div>
          <div className="flex gap-8 text-[9px] font-black text-gray-300 dark:text-gray-800 uppercase tracking-widest">
            <span>Localized</span>
            <span>Real-Time</span>
            <span>Neural</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
