import { ChangeEvent, useEffect, useState } from "react";
import { Question } from ".";
import { fetchQuestions } from "../../lib/fetchQuestions";

interface IProps {
  numQuestions: number;
}

export type ValidationMessage = {
  type: "success" | "error";
  message: { answered: string; correct: string };
};

const LOCAL_STORAGE_ANSWERS_KEY = "answers";

export function useQuestionContainer({ numQuestions }: IProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [error, setError] = useState<Error | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [showValidation, setShowValidation] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] =
    useState<ValidationMessage | null>(null);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  /**
   * Get questions for current game
   */
  async function getQuestions() {
    try {
      const questions = await fetchQuestions(numQuestions);
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
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex === questions.length) return;

    const nextQuestion = questions[nextQuestionIndex];
    setCurrentQuestion(nextQuestion);
    setCurrentQuestionIndex(nextQuestionIndex);
    reset();

    console.log(
      `The answer to ${nextQuestion.question} is ${nextQuestion.answer}`
    );
  }

  /**
   * Move to next question
   */
  function handleOnNextQuestion() {
    getNextQuestion(currentQuestionIndex);
  }

  /**
   * Reset form state
   */
  function reset() {
    setShowValidation(false);
    setCurrentAnswer("");
    setValidationMessage(null);
  }

  /**
   * Start jeopardy
   */
  function handleOnStart() {
    getNextQuestion(currentQuestionIndex);
  }

  /**
   * Handle answer change
   */
  function handleOnAnswerChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentAnswer(event.target.value);
  }

  /**
   * Validate question
   */
  function handleValidation() {
    const isCorrect = currentAnswer === currentQuestion?.answer;
    const validationObj: ValidationMessage = {
      type: isCorrect ? "success" : "error",
      message: {
        answered: currentAnswer,
        correct: currentQuestion?.answer || "",
      },
    };

    setShowValidation(true);
    setValidationMessage(validationObj);

    const items = getLocalStorageAnswers();
    items.push(validationObj);
    localStorage.setItem(LOCAL_STORAGE_ANSWERS_KEY, JSON.stringify(items));
  }

  /**
   * Finish quiz
   */
  function handleOnFinishQuiz() {
    reset();
    setHasEnded(true);
  }

  /**
   * Start over
   */
  async function startOver() {
    await getQuestions();
    setCurrentQuestionIndex(0);
    setHasEnded(false);
    localStorage.setItem(LOCAL_STORAGE_ANSWERS_KEY, JSON.stringify([]));
  }

  /**
   * Get local storage answers
   */
  function getLocalStorageAnswers() {
    const answers = localStorage.getItem(LOCAL_STORAGE_ANSWERS_KEY);
    return answers ? JSON.parse(answers) : [];
  }

  // TODO: migrate to react-router loader to fetch questions
  useEffect(() => {
    getQuestions();
    localStorage.setItem(LOCAL_STORAGE_ANSWERS_KEY, JSON.stringify([]));
  }, []);

  return {
    currentQuestion,
    currentAnswer,
    currentQuestionIndex,
    error,
    onAnswerChange: handleOnAnswerChange,
    onNextQuestion: handleOnNextQuestion,
    onStart: handleOnStart,
    onValidation: handleValidation,
    questions,
    showValidation,
    validationMessage,
    onFinishQuiz: handleOnFinishQuiz,
    hasEnded,
    startOver,
    results: getLocalStorageAnswers(),
  };
}
