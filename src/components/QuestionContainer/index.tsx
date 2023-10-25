import { StartJeopardy } from "../StartJeopardy";
import { ErrorScreen } from "../ErrorScreen";
import { Input } from "../Input";
import { Button } from "../Button";
import { useQuestionContainer } from "./containerHook";
import { classNames } from "../../lib/classNames";
import { ShowResults } from "../ShowResults";

import "./questions.scss";

export type Question = {
  id: number;
  question: string;
  answer: string;
};

const NUM_QUESTIONS = 5;

export function QuestionContainer() {
  const {
    currentQuestion,
    onStart,
    error,
    questions,
    currentQuestionIndex,
    onAnswerChange,
    showValidation,
    onValidation,
    onNextQuestion,
    validationMessage,
    onFinishQuiz,
    hasEnded,
    startOver,
    results,
    currentAnswer,
  } = useQuestionContainer({ numQuestions: NUM_QUESTIONS });
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (!currentQuestion) {
    return <StartJeopardy onStart={onStart} numQuestions={NUM_QUESTIONS} />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  if (hasEnded) {
    return <ShowResults onStartOver={startOver} results={results} />;
  }

  return (
    <section>
      <p>
        {currentQuestionIndex + 1} / {questions.length}
      </p>
      <h2>{currentQuestion.question}</h2>
      <Input
        label="Your answer:"
        name="answer"
        onChange={onAnswerChange}
        value={currentAnswer}
        type="text"
      />
      {validationMessage ? (
        <p
          className={classNames([
            "validation",
            `validation--${validationMessage.type}`,
          ])}
        >
          {validationMessage.type === "success" ? (
            <span>That is correct!</span>
          ) : (
            <span>
              That is incorrect unfortunately. The correct answer is:
              {validationMessage.message.correct}
            </span>
          )}
        </p>
      ) : null}
      {showValidation ? (
        <Button
          type="button"
          className="button button--secondary"
          onClick={isLastQuestion ? onFinishQuiz : onNextQuestion}
        >
          {isLastQuestion ? (
            <span>Finish quiz</span>
          ) : (
            <span>Next question</span>
          )}
        </Button>
      ) : (
        <Button
          className="button button--secondary"
          type="button"
          onClick={onValidation}
        >
          <span>Check my answer</span>
        </Button>
      )}
    </section>
  );
}
