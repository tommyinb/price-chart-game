export function useSetting() {
  const fromDaysKey = "fromDays";

  const fromDaysText = localStorage.getItem(fromDaysKey);
  const fromDaysValue = parseInt(fromDaysText || "5");

  const setFromDays = (fromDays: number) =>
    localStorage.setItem(fromDaysKey, fromDays.toString());

  const toDaysKey = "toDays";

  const toDaysText = localStorage.getItem(toDaysKey);
  const toDaysValue = parseInt(toDaysText || "5");

  const setToDays = (toDays: number) =>
    localStorage.setItem(toDaysKey, toDays.toString());

  const questionsKey = "questions";

  const questionsText = localStorage.getItem(questionsKey);
  const questionsValue = parseInt(questionsText || "20");

  const setQuestions = (questions: number) =>
    localStorage.setItem(questionsKey, questions.toString());

  return {
    fromDays: fromDaysValue,
    setFromDays,

    toDays: toDaysValue,
    setToDays,

    questions: questionsValue,
    setQuestions,
  };
}
