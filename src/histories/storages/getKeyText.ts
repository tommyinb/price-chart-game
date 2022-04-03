import { HistoryKey } from "../HistoryKey";

export function getKeyText(history: HistoryKey) {
  const { fromHours, toHours, expected, answered: actual } = history;

  return `history-${fromHours}-${toHours}-${expected}-${actual}`;
}
