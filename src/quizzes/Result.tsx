import { Link } from "react-router-dom";
import { Answer } from "./Answer";
import { ReactComponent as Cross } from "./cross.svg";
import { Outcome } from "./Outcome";
import "./Result.scss";

export function Result({
  answers,
  count,
}: {
  answers: (Answer | undefined)[];
  count: number;
}) {
  const answeredAnswers = answers.filter((answer) => answer);

  return (
    <div className="quizzes-Result">
      <h2>
        Result {answers.filter((t) => t !== undefined).length}/{count}
      </h2>

      <div className="table">
        <div className="header-label">e\a</div>
        <div className={`header-${Outcome.High}`}>{Outcome.High}</div>
        <div className={`header-${Outcome.Middle}`}>{Outcome.Middle}</div>
        <div className={`header-${Outcome.Low}`}>{Outcome.Low}</div>

        <Row expected={Outcome.High} />
        <Row expected={Outcome.Middle} />
        <Row expected={Outcome.Low} />
      </div>

      <Link className="cross" to="/">
        <Cross />
      </Link>
    </div>
  );

  function Row({ expected }: { expected: Outcome }) {
    const expectedAnswers = answeredAnswers.filter(
      (answer) => answer?.expected === expected
    );

    return (
      <>
        <div className={`${expected}-name`}>{expected}</div>

        <Cell answered={Outcome.High} />
        <Cell answered={Outcome.Middle} />
        <Cell answered={Outcome.Low} />
      </>
    );

    function Cell({ answered }: { answered: Outcome }) {
      const answeredAnswers = expectedAnswers.filter(
        (answer) => answer?.answered === answered
      );

      return (
        <div
          className={`${expected}-${answered} ${
            answeredAnswers.length > 0 ? "active" : ""
          }`}
        >
          {answeredAnswers.length}
        </div>
      );
    }
  }
}
