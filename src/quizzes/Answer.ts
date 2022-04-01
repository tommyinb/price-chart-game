import { Outcome } from "./Outcome";

export interface Answer {
  expected: Outcome;
  actual: Outcome;
}
