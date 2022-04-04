import { useEffect, useMemo, useState } from "react";
import { Chart } from "../charts/Chart";
import { Line } from "../charts/Line";
import { useSetting } from "../settings/useSetting";
import { Answer } from "./Answer";
import { Grid } from "./Grid";
import { Outcome } from "./Outcome";
import "./Question.scss";
import { useData } from "./useData";

export function Question({
  zoom,
  setAnswer,
}: {
  zoom: number;
  setAnswer: (answer: Answer) => void;
}) {
  const { fromHours, toHours } = useSetting();

  const data = useData(fromHours, toHours, zoom);

  const [selectedOutcome, setSelectedOutcome] = useState<Outcome | undefined>();

  useEffect(() => {
    if (data && selectedOutcome) {
      setAnswer({
        date: data.startTime,
        fromHours,
        toHours,
        expected: data.expectedOutcome,
        answered: selectedOutcome,
      });
    }
  }, [data, fromHours, selectedOutcome, setAnswer, toHours]);

  const allPoints = useMemo(
    () => (data ? [...data.fromPoints, ...data.toPoints] : []),
    [data]
  );

  return (
    <div className="quizzes-Question">
      {data && (
        <Chart>
          {selectedOutcome ? (
            <Line points={allPoints} />
          ) : (
            <Line points={data.fromPoints} />
          )}
        </Chart>
      )}

      <Grid
        fromHours={fromHours}
        toHours={toHours}
        zoom={zoom}
        outcome={selectedOutcome}
        setOutcome={setSelectedOutcome}
        correct={selectedOutcome === data?.expectedOutcome}
      />
    </div>
  );
}
