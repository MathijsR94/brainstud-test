import { classNames } from "../../lib/classNames";
import { ValidationMessage } from "../QuestionContainer/containerHook";
import "./results.scss";

interface IProps extends ValidationMessage {}

/**
 * Show single result to the user
 */
export function Result({ type, message }: IProps) {
  return (
    <div className={classNames(["result", `result--${type}`])}>
      <p>The correct answer is: {message.correct}</p>
      <p>You answered: {message.answered}</p>
    </div>
  );
}
