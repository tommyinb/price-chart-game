import { useLayoutEffect, useState } from "react";
import { useSetting } from "../settings/useSetting";
import { Answer } from "./Answer";
import { Question } from "./Question";
import { Result } from "./Result";

export function Quiz() {
  useLayoutEffect(() => {
    window.screen.orientation.lock("landscape");

    return () => {
      window.screen.orientation.unlock();
    };
  }, []);

  const { questions } = useSetting();
  const [answers, setAnswers] = useState<Answer[]>([]);

  return answers.length < questions ? (
    <Question
      key={answers.length}
      setAnswer={(answer) => {
        setAnswers([...answers, answer]);

        //TODO save answer stats
      }}
    />
  ) : (
    <Result />
  );
}
