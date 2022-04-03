import { Outcome } from "./Outcome";

export interface Answer {
  date: Date;

  fromHours: number;
  toHours: number;

  expected: Outcome;
  answered: Outcome;
}
