export interface Question {
  question: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  showExplanation: boolean;
  isComplete: boolean;
  correctAnswers: number;
}

export interface QuizSources {
  [name: string]: string;
}