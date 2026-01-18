
import { LocalizationStrings } from './types';

export const LOCALIZATION: Record<'en' | 'ar', LocalizationStrings> = {
  en: {
    title: 'MARI',
    subtitle: 'AI agent for structured learning in Algeria',
    goalLabel: 'Learning Goal',
    goalPlaceholder: 'e.g., Master Full-stack Development, Learn USTHB Data Structures module',
    deadlineLabel: 'Target Deadline',
    levelLabel: 'Current Level',
    availabilityLabel: 'Availability (Hours/Week)',
    generateButton: 'Generate Learning Path',
    generatingText: 'Synthesizing local data...',
    stepsTitle: 'Your Structured Timeline',
    universityModulesTag: 'Uni Module',
    partneredAcademyTag: 'Academy',
    progressTitle: 'Your Progress',
    noData: 'Share your goal to start your journey.',
    chatTitle: 'Career Concierge',
    chatPlaceholder: 'Type a message...',
    levels: {
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced'
    }
  },
  ar: {
    title: 'ماري',
    subtitle: 'وكيل الذكاء الاصطناعي للتعلم الممنهج في الجزائر',
    goalLabel: 'هدف التعلم',
    goalPlaceholder: 'مثال: إتقان تطوير الويب الشامل، دراسة وحدة هياكل البيانات في USTHB',
    deadlineLabel: 'الموعد النهائي',
    levelLabel: 'المستوى الحالي',
    availabilityLabel: 'التوفر (ساعة/أسبوع)',
    generateButton: 'إنشاء مسار التعلم',
    generatingText: 'جاري تجميع البيانات المحلية...',
    stepsTitle: 'الجدول الزمني الممنهج',
    universityModulesTag: 'وحدة جامعية',
    partneredAcademyTag: 'أكاديمية',
    progressTitle: 'تقدمك',
    noData: 'حدد هدفك لبدء رحلتك.',
    chatTitle: 'مستشار المسار',
    chatPlaceholder: 'اكتب رسالتك...',
    levels: {
      beginner: 'مبتدئ',
      intermediate: 'متوسط',
      advanced: 'متقدم'
    }
  }
};