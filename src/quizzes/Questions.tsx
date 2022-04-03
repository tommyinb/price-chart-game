import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { loadHistory } from "../histories/storages/loadHistory";
import { saveHistory } from "../histories/storages/saveHistory";
import { Answer } from "./Answer";
import { ReactComponent as Next } from "./next.svg";
import { Question } from "./Question";
import "./Questions.scss";
import { ReactComponent as Trash } from "./trash.svg";
import { ReactComponent as Zoom } from "./zoom.svg";

export function Questions({
  count,
  answers,
  setAnswers,
  complete,
}: {
  count: number;
  answers: (Answer | undefined)[];
  setAnswers: Dispatch<SetStateAction<(Answer | undefined)[]>>;
  complete: () => void;
}) {
  const [zoom, setZoom] = useState(3);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= count) {
      complete();
    }
  }, [complete, count, index]);

  const setAnswer = useCallback(
    (answer) => {
      setAnswers((oldAnswers) => {
        const newAnswers = [...oldAnswers];
        newAnswers[index] = answer;
        return newAnswers;
      });
    },
    [index, setAnswers]
  );

  return (
    <div className="quizzes-Questions">
      <div className="controls">
        <div
          className={`trash ${answers[index] ? "active" : ""}`}
          onClick={() => {
            const newAnswers = [...answers];
            newAnswers[index] = undefined;
            setAnswers(newAnswers);
          }}
        >
          <Trash />
        </div>

        <div
          className={`zoom ${zoom !== 3 ? "active" : ""}`}
          onClick={() => setZoom(zoom < 5 ? zoom + 1 : 1)}
        >
          <Zoom />
        </div>

        <div
          className="next"
          onClick={() => {
            setIndex(index + 1);

            const answer = answers[index];
            if (answer) {
              const history = loadHistory(answer);

              saveHistory({
                ...history,
                count: history.count + 1,
              });
            }
          }}
        >
          <Next />
        </div>
      </div>

      <Question key={index} zoom={zoom} setAnswer={setAnswer} />
    </div>
  );
}
