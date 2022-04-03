import { useEffect, useMemo, useState } from "react";
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

  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | undefined>();

  const expectedOutcome = useMemo(
    () => outcomes.find((o) => o !== Outcome.Middle) ?? Outcome.Middle,
    [outcomes]
  );

  console.log(expectedOutcome);

  useEffect(() => {
    if (selectedOutcome) {
      setAnswer({
        date: startTime,
        fromHours,
        toHours,
        expected: expectedOutcome,
        answered: selectedOutcome,
      });
    }
  }, [
    expectedOutcome,
    fromHours,
    selectedOutcome,
    setAnswer,
    startTime,
    toHours,
  ]);

  return (
    <div className="quizzes-Question">
      <Chart>
        <Line points={fromPoints} />

        {selectedOutcome !== undefined && <Line points={toPoints} />}
      </Chart>

      <Grid
        fromHours={fromHours}
        toHours={toHours}
        zoom={zoom}
        outcome={selectedOutcome}
        setOutcome={setSelectedOutcome}
        correct={selectedOutcome === expectedOutcome}
      />
    </div>
  );
}
