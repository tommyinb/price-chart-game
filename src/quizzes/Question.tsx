import { Answer } from "./Answer";

export function Question({
  setAnswer,
}: {
  setAnswer: (answer: Answer) => void;
}) {
  return <div className="quizzes-Question">Question</div>;
}
