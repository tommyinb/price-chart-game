import { useCallback, useState } from "react";
import { useSetting } from "../settings/useSetting";
import { useLockOrientation } from "../utilities/useLockOrientation";
import { Answer } from "./Answer";
import { Questions } from "./Questions";
import { Result } from "./Result";

export function Quiz() {
  useLockOrientation("landscape");

  const { questions } = useSetting();

  const [answers, setAnswers] = useState<(Answer | undefined)[]>([]);

  const [completed, setCompleted] = useState(false);
  const complete = useCallback(() => setCompleted(true), []);

  return completed ? (
    <Result answers={answers} count={questions} />
  ) : (
    <Questions
      count={questions}
      answers={answers}
      setAnswers={setAnswers}
      complete={complete}
    />
  );
}
