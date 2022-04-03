import { max, min } from "lodash";
import { useCallback, useMemo } from "react";
import { Item } from "../files/Item";
import { useData } from "../files/useData";
import { Outcome } from "./Outcome";

export function useLoad(
  startTime: Date,
  fromHours: number,
  toHours: number,
  zoom: number
) {
  const endTime = useMemo(() => {
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + fromHours + toHours - 1);
    return endTime;
  }, [fromHours, startTime, toHours]);

  const allItems = useData(startTime, endTime);

  const { fromItems, toItems } = useMemo(() => {
    const middleTime = new Date(startTime);
    middleTime.setHours(middleTime.getHours() + fromHours - 1);

    return {
      fromItems: allItems.filter((item) => item.time <= middleTime),
      toItems: allItems.filter((item) => item.time > middleTime),
    };
  }, [fromHours, allItems, startTime]);

  const middleItem = fromItems[fromItems.length - 1];
  const middlePrice = middleItem?.price ?? 1;

  const { timeMin, timeRange } = useMemo(() => {
    const times = allItems.map((t) => t.time.getTime());
    const timeMax = max(times) ?? 0;
    const timeMin = min(times) ?? 0;
    const timeRange = timeMax - timeMin;

    return { timeMin, timeRange };
  }, [allItems]);

  const getPoints = useCallback(
    (items: Item[]) =>
      items.map((item) => ({
        x: (item.time.getTime() - timeMin) / timeRange,
        y: ((item.price - middlePrice) / middlePrice) * zoom + 0.5,
      })),
    [middlePrice, timeMin, timeRange, zoom]
  );

  const fromPoints = useMemo(
    () => getPoints(fromItems),
    [fromItems, getPoints]
  );

  const toPoints = useMemo(() => getPoints(toItems), [getPoints, toItems]);

  const outcomes = toItems
    .map((item) => (item.price - middlePrice) / middlePrice)
    .map((change) =>
      change >= 0.05
        ? Outcome.High
        : change <= -0.05
        ? Outcome.Low
        : Outcome.Middle
    );

  return { fromPoints, toPoints, outcomes };
}
