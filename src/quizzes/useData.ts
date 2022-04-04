import { useEffect, useMemo, useState } from "react";
import { getData } from "./getData";
import { Outcome } from "./Outcome";

export function useData(fromHours: number, toHours: number, zoom: number) {
  const expectedOutcome = useMemo(() => {
    const randomValue = Math.random();
    if (randomValue <= 0.333) {
      return Outcome.High;
    } else if (randomValue <= 0.666) {
      return Outcome.Low;
    } else {
      return Outcome.Middle;
    }
  }, []);

  const [data, setData] = useState<
    Awaited<ReturnType<typeof getData>> | undefined
  >();

  useEffect(() => {
    const cancellation = { cancelled: false };

    (async () => {
      const data = await getData(fromHours, toHours, expectedOutcome);

      if (cancellation.cancelled) {
        return;
      }

      setData(data);
    })();

    return () => {
      cancellation.cancelled = true;
    };
  }, [expectedOutcome, fromHours, toHours]);

  const output = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const fromPoints = data.fromPoints.map((point) => ({
      x: point.x,
      y: (point.y - 0.5) * zoom + 0.5,
    }));

    const toPoints = data.toPoints.map((point) => ({
      x: point.x,
      y: (point.y - 0.5) * zoom + 0.5,
    }));

    return {
      startTime: data.startTime,
      fromPoints,
      toPoints,
      expectedOutcome,
    };
  }, [data, expectedOutcome, zoom]);

  return output;
}
