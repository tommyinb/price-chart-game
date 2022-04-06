import { useCallback, useState } from "react";
import { useSetting } from "../settings/useSetting";
import { Answer } from "./Answer";
import { Questions } from "./Questions";
import { Result } from "./Result";

export function Quiz() {
  const { questions } = useSetting();

  const [answers, setAnswers] = useState<Answer[]>([]);

  const [completed, setCompleted] = useState(false);
  const complete = useCallback((answers: Answer[]) => {
    setAnswers(answers);
    setCompleted(true);
  }, []);

  return completed ? (
    <Result answers={answers} count={questions} />
  ) : (
    <Questions count={questions} complete={complete} />
  );
}
