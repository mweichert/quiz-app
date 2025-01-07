import React from 'react';
import { SpeakerButton } from './SpeakerButton';

interface QuizExplanationProps {
  explanation: string;
  isCorrect: boolean;
}

export function QuizExplanation({ explanation, isCorrect }: QuizExplanationProps) {
  const feedbackText = isCorrect ? "Correct. " : "That is not correct. ";
  const fullExplanation = feedbackText + explanation;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-start gap-2">
        <h3 className="font-bold">Explanation:</h3>
        <SpeakerButton text={fullExplanation} />
      </div>
      <p className="mt-2">{fullExplanation}</p>
    </div>
  );
}