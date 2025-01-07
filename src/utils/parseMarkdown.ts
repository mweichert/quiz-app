import { Question } from '../types';

export function parseMarkdown(markdown: string): Question[] {
  const questions: Question[] = [];
  const sections = markdown.split('--').filter(section => section.trim());

  for (const section of sections) {
    const lines = section.trim().split('\n');
    const question: Partial<Question> = {
      answers: { A: '', B: '', C: '', D: '' }
    };

    for (const line of lines) {
      if (line.startsWith('Question:')) {
        question.question = line.replace('Question:', '').trim();
      } else if (line.startsWith('A:')) {
        question.answers!.A = line.replace('A:', '').trim();
      } else if (line.startsWith('B:')) {
        question.answers!.B = line.replace('B:', '').trim();
      } else if (line.startsWith('C:')) {
        question.answers!.C = line.replace('C:', '').trim();
      } else if (line.startsWith('D:')) {
        question.answers!.D = line.replace('D:', '').trim();
      } else if (line.startsWith('Answer:')) {
        question.correctAnswer = line.replace('Answer:', '').trim() as 'A' | 'B' | 'C' | 'D';
      } else if (line.startsWith('Explanation:')) {
        question.explanation = line.replace('Explanation:', '').trim();
      }
    }

    if (question.question && question.correctAnswer && question.explanation) {
      questions.push(question as Question);
    }
  }

  return questions;
}