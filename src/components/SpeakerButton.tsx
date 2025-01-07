import React from 'react';
import { Volume2 } from 'lucide-react';

interface SpeakerButtonProps {
  text: string;
  className?: string;
}

export function SpeakerButton({ text, className = '' }: SpeakerButtonProps) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={speak}
      className={`inline-flex items-center text-blue-600 hover:text-blue-800 ${className}`}
      aria-label="Read aloud"
    >
      <Volume2 className="w-5 h-5" />
    </button>
  );
}