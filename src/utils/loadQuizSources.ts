import { QuizSources } from '../types';

export async function loadQuizSources(): Promise<QuizSources | null> {
  const url = import.meta.env.VITE_QUIZ_SOURCES_URL;
  
  try {
    if (url) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }
    
    // Fall back to default quizzes if no URL is provided
    const defaultResponse = await fetch('/default_quizes.json');
    if (!defaultResponse.ok) {
      throw new Error(`HTTP error! status: ${defaultResponse.status}`);
    }
    return await defaultResponse.json();
  } catch (error) {
    console.error('Failed to load quiz sources:', error);
    return null;
  }
}