import { useEffect, useState } from "react";
import { fetchQuestions } from "../../lib/fetchQuestions";
import { StartJeopardy } from "../StartJeopardy";
import { ErrorScreen } from "../ErrorScreen";

export type Question = {
  id: number;
  question: string;
  answer: string;
};

export function QuestionContainer() {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [error, setError] = useState<Error | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);

  async function getQuestions() {
    try {
      const questions = await fetchQuestions(5);
      setQuestions(questions);
    } catch (err) {
      const error = err as Error;
      console.error(error);
      setError(error);
    }
  }

  /**
   * Get next question
   */
  function getNextQuestion(currentQuestionIndex: number) {
    if (currentQuestionIndex + 1 > questions.length - 1) return;

    const nextQuestionIndex = currentQuestionIndex + 1;
    const nextQuestion = questions[nextQuestionIndex];
    setCurrentQuestion(nextQuestion);
    setCurrentQuestionIndex(nextQuestionIndex);

    console.log(
      `The answer to ${nextQuestion.question} is ${nextQuestion.answer}`
    );
  }

  /**
   * Start jeopardy
   */
  function handleOnStart() {
    getNextQuestion(currentQuestionIndex);
  }

  // TODO: migrate to react-router loader to fetch questions
  useEffect(() => {
    getQuestions();
  }, []);

  if (!currentQuestion) {
    return <StartJeopardy onStart={handleOnStart} />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  return (
    <section>
      <h2>Question</h2>
      <p>Answer</p>
      <p>Validation</p>
    </section>
  );
}
