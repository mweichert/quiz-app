import React, { useState, useCallback, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { Question, QuizState, QuizSources } from './types';
import { parseMarkdown } from './utils/parseMarkdown';
import { loadQuizSources } from './utils/loadQuizSources';
import { SpeakerButton } from './components/SpeakerButton';
import { QuizSummary } from './components/QuizSummary';
import { QuizAnswer } from './components/QuizAnswer';
import { QuizExplanation } from './components/QuizExplanation';

function App() {
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showExplanation: false,
    isComplete: false,
    correctAnswers: 0,
  });
  const [quizSources, setQuizSources] = useState<QuizSources | null>(null);

  useEffect(() => {
    loadQuizSources().then(setQuizSources);
  }, []);

  const loadQuizFromUrl = async (url: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      const questions = parseMarkdown(content);
      setQuizState({
        questions,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showExplanation: false,
        isComplete: false,
        correctAnswers: 0,
      });
    } catch (error) {
      console.error('Failed to load quiz:', error);
      alert('Failed to load the quiz. Please try again or choose a different quiz.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const questions = parseMarkdown(content);
      setQuizState({
        questions,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showExplanation: false,
        isComplete: false,
        correctAnswers: 0,
      });
    };
    reader.readAsText(file);
  };

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (quizState.showExplanation) return;
    setQuizState(prev => ({ ...prev, selectedAnswer: answer }));
  };

  const handleNext = () => {
    if (!quizState.selectedAnswer) return;

    const isCorrect = quizState.selectedAnswer === currentQuestion.correctAnswer;
    
    if (!quizState.showExplanation) {
      setQuizState(prev => ({
        ...prev,
        showExplanation: true,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      }));
      return;
    }

    const nextIndex = quizState.currentQuestionIndex + 1;
    if (nextIndex >= quizState.questions.length) {
      setQuizState(prev => ({ ...prev, isComplete: true }));
      return;
    }

    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      selectedAnswer: null,
      showExplanation: false,
    }));
  };

  const restart = useCallback(() => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showExplanation: false,
      isComplete: false,
      correctAnswers: 0,
    }));
  }, []);

  const selectAnotherQuiz = useCallback(() => {
    setQuizState(prev => ({
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      showExplanation: false,
      isComplete: false,
      correctAnswers: 0,
    }));
  }, []);

  if (quizState.isComplete) {
    return (
      <QuizSummary
        totalQuestions={quizState.questions.length}
        correctAnswers={quizState.correctAnswers}
        onRestart={restart}
        onSelectAnotherQuiz={selectAnotherQuiz}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <Upload className="w-12 h-12 mx-auto mb-4 text-blue-600" />
          <h1 className="text-2xl font-bold mb-4 text-center">Choose a Quiz</h1>
          
          {quizSources && Object.keys(quizSources).length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3">Available Quizzes</h2>
              <div className="space-y-2">
                {Object.entries(quizSources).map(([name, url]) => (
                  <div
                    key={name}
                    className="flex items-center gap-2"
                  >
                    <button
                      onClick={() => loadQuizFromUrl(url)}
                      className="flex-grow text-left px-4 py-2 rounded-lg border border-gray-200 
                               hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      {name}
                    </button>
                    <SpeakerButton text={name} className="p-2" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <h2 className="text-lg font-semibold mb-3">Upload Your Own Quiz</h2>
            <label className="block">
              <span className="sr-only">Choose file</span>
              <input
                type="file"
                accept=".md,.txt"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </label>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex items-start gap-2">
            <h2 className="text-xl font-bold flex-grow">
              Question {quizState.currentQuestionIndex + 1} of {quizState.questions.length}
            </h2>
            <SpeakerButton text={currentQuestion.question} />
          </div>
          <p className="text-lg mt-2">{currentQuestion.question}</p>
        </div>

        <div className="space-y-4">
          {Object.entries(currentQuestion.answers).map(([key, value]) => (
            <QuizAnswer
              key={key}
              answerKey={key}
              answerText={value}
              isSelected={quizState.selectedAnswer === key}
              showExplanation={quizState.showExplanation}
              isCorrect={key === currentQuestion.correctAnswer}
              correctAnswer={currentQuestion.correctAnswer}
              onSelect={handleAnswerSelect}
            />
          ))}
        </div>

        {quizState.showExplanation && (
          <QuizExplanation
            explanation={currentQuestion.explanation}
            isCorrect={quizState.selectedAnswer === currentQuestion.correctAnswer}
          />
        )}

        <button
          onClick={handleNext}
          disabled={!quizState.selectedAnswer}
          className={`mt-6 px-6 py-2 rounded-lg text-white font-semibold w-full
            ${quizState.selectedAnswer
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {quizState.showExplanation ? 'Next Question' : 'Check Answer'}
        </button>
        <button
          onClick={selectAnotherQuiz}
          className="mt-3 px-6 py-2 rounded-lg font-semibold w-full bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
        >
          Select Another Quiz
        </button>
      </div>
    </div>
  );
}

export default App;