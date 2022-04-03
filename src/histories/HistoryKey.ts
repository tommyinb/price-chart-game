import { Answer } from "../quizzes/Answer";

export type HistoryKey = Omit<Answer, "date">;
