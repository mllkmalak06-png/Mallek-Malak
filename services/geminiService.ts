
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { LearningPathInput, Language, LearningPath } from "../types";

export const generateLearningPath = async (
  input: LearningPathInput,
  lang: Language
): Promise<LearningPath> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are MARI, an AI agent specialized in creating structured learning paths for Algerian students and professionals.
    Your voice is concise, credible, and future-focused.
    Focus on localizing the content to the Algerian academic landscape (e.g., USTHB, ESI, ENP, local online academies like Vodev, i-Madrassa, or specific YouTube channels popular in Algeria).
    The response must be in ${lang === 'ar' ? 'Arabic' : 'English'}.
  `;

  const prompt = `
    Create a step-by-step learning path for:
    Goal: ${input.goal}
    Deadline: ${input.deadline}
    Current Level: ${input.level}
    Availability: ${input.availability} hours per week.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                academyName: { type: Type.STRING },
                courseLink: { type: Type.STRING },
                isUniversityModule: { type: Type.BOOLEAN }
              },
              required: ["id", "title", "description", "duration", "academyName", "courseLink", "isUniversityModule"]
            }
          },
          forwardLookingSentence: { type: Type.STRING }
        },
        required: ["summary", "steps", "forwardLookingSentence"]
      }
    }
  });

  // Accessing text property directly as per guidelines
  return JSON.parse(response.text || '{}');
};

// Added export for startChatSession to fix ChatWidget error
export const startChatSession = (lang: Language): Chat => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are MARI, an AI career and academic advisor specialized in the Algerian education system (USTHB, ESI, ENP, etc.). 
      Help students and professionals with advice on universities, career paths, and study tips.
      Your responses should be helpful, concise, and professional. 
      The conversation must be in ${lang === 'ar' ? 'Arabic' : 'English'}.`,
    },
  });
};