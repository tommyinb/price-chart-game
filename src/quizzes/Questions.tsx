import { useCallback, useEffect, useMemo, useState } from "react";
import { Point } from "../charts/Point";
import { useSetting } from "../settings/useSetting";
import { Answer } from "./Answer";
import { getData } from "./getData";
import { ReactComponent as Next } from "./next.svg";
import { Outcome } from "./Outcome";
import { Question } from "./Question";
import "./Questions.scss";
import { ReactComponent as Trash } from "./trash.svg";
import { ReactComponent as Zoom } from "./zoom.svg";

export function Questions({
  count,
  complete,
}: {
  count: number;
  complete: (answers: Answer[]) => void;
}) {
  const { fromHours, toHours } = useSetting();

  const [contents, setContents] = useState<QuestionContent[]>([]);

  useEffect(() => {
    if (contents.length >= count) {
      return;
    }

    const cancellation = { cancelled: false };

    (async () => {
      const content = await nextContent(fromHours, toHours);

      if (cancellation.cancelled) {
        return;
      }

      setContents([...contents, content]);
    })();

    return () => {
      cancellation.cancelled = true;
    };
  }, [contents, count, fromHours, toHours]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < count) {
      return;
    }

    const answers = contents
      .filter((content) => content.answeredOutcome !== undefined)
      .map((content) => ({
        date: content.startTime,
        fromHours,
        toHours,
        expected: content.expectedOutcome,
        answered: content.answeredOutcome ?? Outcome.Middle,
      }));

    complete(answers);
  }, [complete, contents, count, fromHours, index, toHours]);

  const [zoom, setZoom] = useState(3);

  const fromPoints = useMemo(
    () => contents[index]?.fromPoints ?? [],
    [contents, index]
  );

  const toPoints = useMemo(
    () => contents[index]?.toPoints ?? [],
    [contents, index]
  );

  const expectedOutcome = useMemo(
    () => contents[index]?.expectedOutcome ?? Outcome.Middle,
    [contents, index]
  );

  const answeredOutcome = useMemo(
    () => contents[index]?.answeredOutcome,
    [contents, index]
  );

  const setAnsweredOutcome = useCallback(
    (outcome: Outcome | undefined) => {
      const questionContent = contents[index];

      if (!questionContent) {
        return;
      }

      const answeredContents = [...contents];

      answeredContents[index] = {
        ...questionContent,
        answeredOutcome: outcome,
      };

      setContents(answeredContents);
    },
    [contents, index]
  );

  return (
    <div className="quizzes-Questions">
      <div className="controls">
        <div
          className={`back ${index > 0 ? "active" : ""}`}
          onClick={() => setIndex(index - 1)}
        >
          <Next />
        </div>

        <div
          className={`trash ${answeredOutcome ? "active" : ""}`}
          onClick={() => setAnsweredOutcome(undefined)}
        >
          <Trash />
        </div>

        <div
          className={`zoom ${zoom !== 3 ? "active" : ""}`}
          onClick={() => setZoom(zoom < 5 ? zoom + 1 : 1)}
        >
          <Zoom />
        </div>

        <div className="next" onClick={() => setIndex(index + 1)}>
          <Next />
        </div>
      </div>

      <Question
        key={index}
        fromHours={fromHours}
        toHours={toHours}
        fromPoints={fromPoints}
        toPoints={toPoints}
        zoom={zoom}
        expectedOutcome={expectedOutcome}
        answeredOutcome={answeredOutcome}
        setAnsweredOutcome={setAnsweredOutcome}
      />
    </div>
  );
}

interface QuestionContent {
  startTime: Date;
  fromPoints: Point[];
  toPoints: Point[];
  expectedOutcome: Outcome;
  answeredOutcome: Outcome | undefined;
}

async function nextContent(
  fromHours: number,
  toHours: number
): Promise<QuestionContent> {
  const randomValue = Math.random();

  const outcome =
    randomValue <= 0.333
      ? Outcome.High
      : randomValue <= 0.666
      ? Outcome.Low
      : Outcome.Middle;

  const { startTime, fromPoints, toPoints } = await getData(
    fromHours,
    toHours,
    outcome
  );

  return {
    startTime,
    fromPoints,
    toPoints,
    expectedOutcome: outcome,
    answeredOutcome: undefined,
  };
}
