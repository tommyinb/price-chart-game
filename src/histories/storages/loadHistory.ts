import { History } from "../History";
import { HistoryKey } from "../HistoryKey";
import { getKeyText } from "./getKeyText";

export function loadHistory(key: HistoryKey): History {
  const keyText = getKeyText(key);

  const countText = localStorage.getItem(keyText);
  return { ...key, count: parseInt(countText ?? "0") };
}
