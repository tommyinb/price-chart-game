import { History } from "../History";
import { getKeyText } from "./getKeyText";

export function saveHistory(history: History) {
  const keyText = getKeyText(history);

  const countText = history.count.toString();

  localStorage.setItem(keyText, countText);
}
