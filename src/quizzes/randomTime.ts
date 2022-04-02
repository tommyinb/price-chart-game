import range from "../files/range.json";

export function randomTime(hours: number) {
  const startDate = new Date(range.start);
  const startValue = startDate.getTime();

  const endDate = new Date(range.end);
  const endValue = endDate.getTime();

  const resultLength = endValue - startValue - hours * 60 * 60 * 1000;

  if (resultLength <= 0) {
    throw new Error(
      `start ${startDate} to end ${endDate} has less than ${hours} hours`
    );
  }

  const randomValue = Math.random();
  const resultValue = startValue + Math.round(randomValue * resultLength);

  const resultDate = new Date(resultValue);
  const resultText = resultDate.toISOString();

  const outputText = resultText.replace(/\d\d:\d\d.\d{3}/, "00:00.000");
  return new Date(outputText);
}
