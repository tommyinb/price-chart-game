import all from "it-all";
import { max, min } from "lodash";
import { Item } from "../files/Item";
import { loadData as loadFileData } from "../files/loadData";
import { Outcome } from "./Outcome";

export async function loadData(
  startTime: Date,
  fromHours: number,
  toHours: number
) {
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + fromHours + toHours - 1);

  const allItems = await all(loadFileData(startTime, endTime));

  const middleTime = new Date(startTime);
  middleTime.setHours(middleTime.getHours() + fromHours - 1);

  const fromItems = allItems.filter((item) => item.time <= middleTime);
  const toItems = allItems.filter((item) => item.time > middleTime);

  const middleItem = fromItems[fromItems.length - 1];
  const middlePrice = middleItem?.price ?? 1;

  const times = allItems.map((t) => t.time.getTime());
  const timeMax = max(times) ?? 0;
  const timeMin = min(times) ?? 0;
  const timeRange = timeMax - timeMin;

  const fromPoints = getPoints(fromItems);
  const toPoints = getPoints(toItems);

  function getPoints(items: Item[]) {
    return items.map((item) => ({
      x: (item.time.getTime() - timeMin) / timeRange,
      y: (item.price - middlePrice) / middlePrice + 0.5,
    }));
  }

  const toOutcomes = toItems
    .map((item) => (item.price - middlePrice) / middlePrice)
    .map((change) =>
      change >= 0.05
        ? Outcome.High
        : change <= -0.05
        ? Outcome.Low
        : Outcome.Middle
    );

  const expectedOutcome =
    toOutcomes.find((o) => o !== Outcome.Middle) ?? Outcome.Middle;

  return {
    fromPoints,
    toPoints,
    toOutcomes,
    expectedOutcome,
  };
}
