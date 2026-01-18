
export type Language = 'en' | 'ar';

export enum ProficiencyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced'
}

export interface LearningPathInput {
  goal: string;
  deadline: string;
  level: ProficiencyLevel;
  availability: number; // hours per week
}

export interface Step {
  id: string;
  title: string;
  description: string;
  duration: string;
  academyName: string;
  courseLink: string;
  isUniversityModule: boolean;
}

export interface LearningPath {
  summary: string;
  steps: Step[];
  forwardLookingSentence: string;
}

// Added ChatMessage interface
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface LocalizationStrings {
  title: string;
  subtitle: string;
  goalLabel: string;
  goalPlaceholder: string;
  deadlineLabel: string;
  levelLabel: string;
  availabilityLabel: string;
  generateButton: string;
  generatingText: string;
  stepsTitle: string;
  universityModulesTag: string;
  partneredAcademyTag: string;
  progressTitle: string;
  noData: string;
  // Added localization keys for chat
  chatTitle: string;
  chatPlaceholder: string;
  levels: {
    [key in ProficiencyLevel]: string;
  };
}