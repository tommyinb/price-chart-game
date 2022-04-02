import { useCallback, useMemo } from "react";

export function useSetting() {
  const fromHoursKey = "fromHours";
  const { value: fromHours, setValue: setFromHours } = useValue(
    fromHoursKey,
    "24"
  );

  const toHoursKey = "toHours";
  const { value: toHours, setValue: setToHours } = useValue(toHoursKey, "24");

  const questionsKey = "questions";
  const { value: questions, setValue: setQuestions } = useValue(
    questionsKey,
    "20"
  );

  return {
    fromHours,
    setFromHours,

    toHours,
    setToHours,

    questions,
    setQuestions,
  };
}

function useValue(key: string, defaultText: string) {
  const value = useMemo(() => {
    const text = localStorage.getItem(key);
    return parseInt(text ?? defaultText);
  }, [defaultText, key]);

  const setValue = useCallback(
    (value: number) => localStorage.setItem(key, value.toString()),
    [key]
  );

  return {
    value,
    setValue,
  };
}
