import { Outcome } from "../../quizzes/Outcome";
import { History } from "../History";

export function* getAllHistories() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const match = /history-(\d+)-(\d+)-(\w+)-(\w+)/.exec(key);
      if (match) {
        const fromHours = parseInt(match[1]);
        const toHours = parseInt(match[2]);

        const expected = match[3] as Outcome;
        const actual = match[4] as Outcome;

        const countText = localStorage.getItem(key);
        const countValue = parseInt(countText || "0");

        const history: History = {
          fromHours,
          toHours,
          expected,
          answered: actual,
          count: countValue,
        };

        yield history;
      }
    }
  }
}
