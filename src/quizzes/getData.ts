import { loadData } from "./loadData";
import { Outcome } from "./Outcome";
import { randomTime } from "./randomTime";

export async function getData(
  fromHours: number,
  toHours: number,
  expectedOutcome: Outcome
) {
  const count = 1000;
  for (let i = 0; i < count; i++) {
    const startTime = randomTime(fromHours + toHours);

    const {
      fromPoints,
      toPoints,
      outcome: dataOutcome,
    } = await loadData(startTime, fromHours, toHours);

    if (dataOutcome === expectedOutcome) {
      return {
        startTime,
        fromPoints,
        toPoints,
      };
    }
  }

  throw new Error(`cannot find ${expectedOutcome} after ${count} tries`);
}
