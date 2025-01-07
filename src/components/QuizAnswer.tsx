import React from 'react';
import { Check, X } from 'lucide-react';
import { SpeakerButton } from './SpeakerButton';

interface QuizAnswerProps {
  answerKey: string;
  answerText: string;
  isSelected: boolean;
  showExplanation: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  onSelect: (answer: string) => void;
}

export function QuizAnswer({
  answerKey,
  answerText,
  isSelected,
  showExplanation,
  isCorrect,
  correctAnswer,
  onSelect,
}: QuizAnswerProps) {
  const getStatusIcon = () => {
    if (!showExplanation || !isSelected) return null;
    return isCorrect ? (
      <Check className="w-5 h-5 text-green-600" />
    ) : (
      <X className="w-5 h-5 text-red-600" />
    );
  };

  const getBorderStyle = () => {
    if (showExplanation) {
      if (answerKey === correctAnswer) return 'border-green-500 bg-green-50';
      if (isSelected) return 'border-red-500 bg-red-50';
    }
    if (isSelected) return 'border-blue-500 bg-blue-50';
    return 'border-gray-200 hover:border-blue-300';
  };

  return (
    <div
      className={`p-4 rounded-lg border-2 cursor-pointer flex items-center gap-2 ${getBorderStyle()}`}
      onClick={() => onSelect(answerKey)}
    >
      <span className="font-bold min-w-[24px]">{answerKey}:</span>
      <span className="flex-grow">{answerText}</span>
      <div className="flex items-center gap-2">
        {getStatusIcon()}
        <SpeakerButton text={answerText} />
      </div>
    </div>
  );
}