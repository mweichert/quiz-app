import React from 'react';
import { Trophy } from 'lucide-react';

interface QuizSummaryProps {
  totalQuestions: number;
  correctAnswers: number;
  onRestart: () => void;
  onSelectAnotherQuiz: () => void;
}

export function QuizSummary({ totalQuestions, correctAnswers, onRestart, onSelectAnotherQuiz }: QuizSummaryProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
      <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
      <p className="text-lg mb-4">
        You got <span className="font-bold text-green-600">{correctAnswers}</span> out of{' '}
        <span className="font-bold">{totalQuestions}</span> questions correct.
      </p>
      <p className="text-xl font-bold mb-6">Score: {percentage}%</p>
      <div className="space-y-3">
        <button
          onClick={onRestart}
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
        <button
          onClick={onSelectAnotherQuiz}
          className="w-full bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Select Another Quiz
        </button>
      </div>
    </div>
  );
}