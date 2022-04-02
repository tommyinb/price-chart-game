import { useEffect, useState } from "react";
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
  setAnswers: (answers: (Answer | undefined)[]) => void;
  complete: () => void;
}) {
  const [zoom, setZoom] = useState(3);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= count) {
      complete();
    }
  }, [complete, count, index]);

  return (
    <div className="quizzes-Questions">
      <div className="controls">
        <div
          className="trash"
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
            //TODO save answer to history
          }}
        >
          <Next />
        </div>
      </div>

      {answers.length < count && (
        <Question
          key={index}
          zoom={zoom}
          setAnswer={(answer) => {
            const newAnswers = [...answers];
            newAnswers[index] = answer;
            setAnswers(newAnswers);
          }}
        />
      )}
    </div>
  );
}
