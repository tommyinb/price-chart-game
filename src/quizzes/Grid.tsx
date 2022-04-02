import "./Grid.scss";
import { Outcome } from "./Outcome";

export function Grid({
  fromHours,
  toHours,
  zoom,
  outcome,
  setOutcome,
  correct,
}: {
  fromHours: number;
  toHours: number;
  zoom: number;
  outcome: Outcome | undefined;
  setOutcome: (outcome: Outcome) => void;
  correct: boolean;
}) {
  return (
    <div className="quizzes-Grid">
      <div className="high" style={{ flex: (200 - 20 * zoom) / 2 }}>
        <div className="left" style={{ flex: fromHours }}></div>

        <Right outcome={Outcome.High} />
      </div>

      <div className="middle" style={{ flex: 20 * zoom }}>
        <div className="left" style={{ flex: fromHours }}></div>

        <Right outcome={Outcome.Middle} />
      </div>

      <div className="low" style={{ flex: (200 - 20 * zoom) / 2 }}>
        <div className="left" style={{ flex: fromHours }}></div>

        <Right outcome={Outcome.Low} />
      </div>
    </div>
  );

  function Right({ outcome: lineOutcome }: { outcome: Outcome }) {
    return (
      <div
        className={`right ${
          lineOutcome === outcome ? (correct ? "correct" : "incorrect") : ""
        }`}
        style={{ flex: toHours }}
        onClick={() => {
          if (outcome === undefined) {
            setOutcome(lineOutcome);
          }
        }}
      ></div>
    );
  }
}
