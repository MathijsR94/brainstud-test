import { Button } from "../Button";
import { ValidationMessage } from "../QuestionContainer/containerHook";
import { Result } from "./Result";
import "./container.scss";

interface IProps {
  results: Array<ValidationMessage>;
  onStartOver: () => void;
}

/**
 * Show results to the user
 */
export function ShowResults({ onStartOver, results }: IProps) {
  return (
    <section>
      <p className="heading heading--h1">Results</p>
      <p>Here are your results!</p>
      <div className="results__container">
        {results.map((result) => (
          <Result {...result} />
        ))}
      </div>
      <Button
        type="button"
        className="button button--secondary"
        onClick={onStartOver}
      >
        <span>Start a new quiz</span>
      </Button>
    </section>
  );
}
