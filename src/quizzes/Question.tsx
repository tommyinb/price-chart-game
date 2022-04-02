import { useMemo, useState } from "react";
import { Chart } from "../charts/Chart";
import { Line } from "../charts/Line";
import { useSetting } from "../settings/useSetting";
import { Answer } from "./Answer";
import { Grid } from "./Grid";
import { Outcome } from "./Outcome";
import "./Question.scss";
import { randomTime } from "./randomTime";
import { useLoad } from "./useLoad";

export function Question({
  zoom,
  setAnswer,
}: {
  zoom: number;
  setAnswer: (answer: Answer) => void;
}) {
  const { fromHours, toHours } = useSetting();

  const startTime = useMemo(
    () => randomTime(fromHours + toHours),
    [fromHours, toHours]
  );

  const { fromPoints, toPoints, outcomes } = useLoad(
    startTime,
    fromHours,
    toHours,
    zoom
  );

  const [outcome, setOutcome] = useState<Outcome | undefined>();

  const correct = useMemo(() => {
    switch (outcome) {
      case Outcome.Middle:
        return outcomes.every((o) => o === Outcome.Middle);

      case Outcome.High:
      case Outcome.Low:
        const first = outcomes.find((o) => o !== Outcome.Middle);
        return first === outcome;

      default:
        return false;
    }
  }, [outcome, outcomes]);

  return (
    <div className="quizzes-Question">
      <Chart>
        <Line points={fromPoints} />

        {outcome !== undefined && <Line points={toPoints} />}
      </Chart>

      <Grid
        fromHours={fromHours}
        toHours={toHours}
        zoom={zoom}
        outcome={outcome}
        setOutcome={setOutcome}
        correct={correct}
      />
    </div>
  );
}
