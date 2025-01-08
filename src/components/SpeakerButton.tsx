import React, { useCallback, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeakerButtonProps {
  text: string;
  className?: string;
}

export function SpeakerButton({ text, className = '' }: SpeakerButtonProps) {
  const [isSupported] = useState(() => 'speechSynthesis' in window);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback(() => {
    if (!isSupported) {
      console.warn('Speech synthesis not supported');
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
      };

      // Some mobile browsers work better with these settings
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Speech synthesis failed:', error);
      setIsSpeaking(false);
    }
  }, [text, isSupported]);

  if (!isSupported) return null;

  return (
    <button
      onClick={speak}
      className={`inline-flex items-center text-blue-600 hover:text-blue-800 ${className}`}
      aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
    >
      {isSpeaking ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
    </button>
  );
}