import { useContext } from "react";
import { ChartContext } from "./ChartContext";
import "./Line.scss";
import { Point } from "./Point";

export function Line({ points: dataPoints }: { points: Point[] }) {
  const { width, height } = useContext(ChartContext);

  if (dataPoints.length < 2) {
    return <></>;
  }

  const drawPoints = dataPoints.map((point) => ({
    x: point.x * width,
    y: (1 - point.y) * height,
  }));

  const firstPoint = drawPoints[0];
  const firstText = `M${firstPoint.x} ${firstPoint.y}`;

  const followingPoints = drawPoints.slice(1, drawPoints.length);
  const followingTexts = followingPoints.map((t) => `L${t.x} ${t.y}`);

  return (
    <path
      className="charts-Line"
      d={`${firstText} ${followingTexts.join(" ")}`}
    />
  );
}
