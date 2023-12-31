import { Fragment } from "react";
import { Button } from "../Button";

interface IProps {
  onStart: () => void;
  numQuestions: number;
}

/**
 * Shows a start screen for the Jeopardy game
 */
export function StartJeopardy({ onStart, numQuestions }: IProps) {
  return (
    <Fragment>
      <p className="heading heading--h1">Brainstud Jeopardy</p>
      <p>
        In Jeopardy, you get a clue. Based on the clue, you need to think of the
        answer. In this small app, you will make {numQuestions} jeopardy
        questions. At the end, you will receive your score.
      </p>
      <Button
        type="button"
        className="button button--secondary"
        onClick={onStart}
      >
        <span>Start!</span>
      </Button>
    </Fragment>
  );
}
