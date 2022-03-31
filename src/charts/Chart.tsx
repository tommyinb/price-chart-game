import { useRef } from "react";
import "./Chart.scss";
import { Line } from "./Line";
import { Point } from "./Point";

export function Chart({ points: dataPoint }: { points: Point[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const width = ref?.current?.clientWidth ?? 1;
  const height = ref?.current?.clientHeight ?? 1;

  return (
    <div className="charts-Chart" ref={ref}>
      <svg width={width} height={height}>
        <Line points={dataPoint} />
      </svg>
    </div>
  );
}
