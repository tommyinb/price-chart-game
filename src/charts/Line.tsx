import "./Line.scss";
import { Point } from "./Point";

export function Line({ points }: { points: Point[] }) {
  if (points.length < 2) {
    return <></>;
  }

  const firstPoint = points[0];
  const firstText = `M${firstPoint.x} ${firstPoint.y}`;

  const followingPoints = points.slice(1, points.length - 1);
  const followingTexts = followingPoints.map((t) => `L${t.x} ${t.y}`);

  return (
    <path
      className="charts-Line"
      d={`${firstText} ${followingTexts.join(" ")}`}
    />
  );
}
