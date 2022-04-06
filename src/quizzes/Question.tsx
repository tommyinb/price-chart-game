import { useMemo } from "react";
import { Chart } from "../charts/Chart";
import { Line } from "../charts/Line";
import { Point } from "../charts/Point";
import { Grid } from "./Grid";
import { Outcome } from "./Outcome";
import "./Question.scss";

export function Question({
  fromHours,
  toHours,
  fromPoints,
  toPoints,
  zoom,
  expectedOutcome,
  answeredOutcome,
  setAnsweredOutcome,
}: {
  fromHours: number;
  toHours: number;
  fromPoints: Point[];
  toPoints: Point[];
  zoom: number;
  expectedOutcome: Outcome;
  answeredOutcome: Outcome | undefined;
  setAnsweredOutcome: (outcome: Outcome) => void;
}) {
  const { zoomedFromPoints, zoomedToPoints } = useMemo(() => {
    const zoomedFromPoints = fromPoints.map((point) => ({
      x: point.x,
      y: (point.y - 0.5) * zoom + 0.5,
    }));

    const zoomedToPoints = toPoints.map((point) => ({
      x: point.x,
      y: (point.y - 0.5) * zoom + 0.5,
    }));

    return { zoomedFromPoints, zoomedToPoints };
  }, [fromPoints, toPoints, zoom]);

  const answerPoints = useMemo(
    () => [
      ...zoomedFromPoints.slice(zoomedFromPoints.length - 1),
      ...zoomedToPoints,
    ],
    [zoomedFromPoints, zoomedToPoints]
  );

  return (
    <div className="quizzes-Question">
      <Chart>
        <Line points={zoomedFromPoints} />

        {answeredOutcome && <Line points={answerPoints} />}
      </Chart>

      <Grid
        fromHours={fromHours}
        toHours={toHours}
        zoom={zoom}
        outcome={answeredOutcome}
        setOutcome={setAnsweredOutcome}
        correct={answeredOutcome === expectedOutcome}
      />
    </div>
  );
}
