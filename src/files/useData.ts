import all from "it-all";
import { useEffect, useState } from "react";
import { Item } from "./Item";

export function useData(start: Date, end: Date) {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const cancellation = { cancelled: false };

    (async () => {
      const data = await all(loadData(start, end));

      if (cancellation.cancelled) {
        return;
      }

      const filtered = data.filter(
        (item) => item.time >= start && item.time <= end
      );

      setData(filtered);
    })();

    return () => {
      cancellation.cancelled = true;
    };
  }, [start, end]);

  return data;
}

async function* loadData(start: Date, end: Date) {
  const yearMonths = getYearMonths(start, end);

  for (const yearMonth of yearMonths) {
    const load = await loadFile(yearMonth.year, yearMonth.month);

    for (const item of load.default) {
      yield {
        time: new Date(item.time),
        price: item.price,
        count: item.count,
      };
    }
  }
}

function* getYearMonths(start: Date, end: Date) {
  const startYear = start.getUTCFullYear();
  const startMonth = start.getUTCMonth() + 1;

  const endYear = end.getUTCFullYear();
  const endMonth = end.getUTCMonth() + 1;

  for (let year = startYear; year <= endYear; year++) {
    for (let month = 1; month <= 12; month++) {
      if (year === startYear && month < startMonth) {
        continue;
      }
      if (year === endYear && month > endMonth) {
        continue;
      }

      yield { year, month };
    }
  }
}

function loadFile(year: number, month: number) {
  switch (year) {
    case 2020:
      switch (month) {
        case 8:
          return import("./2020-8.json");
        case 9:
          return import("./2020-9.json");
        case 10:
          return import("./2020-10.json");
        case 11:
          return import("./2020-11.json");
        case 12:
          return import("./2020-12.json");
        default:
          throw new Error(`${year}-${month}.json is not found`);
      }
    case 2021:
      switch (month) {
        case 1:
          return import("./2021-1.json");
        case 2:
          return import("./2021-2.json");
        case 3:
          return import("./2021-3.json");
        case 4:
          return import("./2021-4.json");
        case 5:
          return import("./2021-5.json");
        case 6:
          return import("./2021-6.json");
        case 7:
          return import("./2021-7.json");
        case 8:
          return import("./2021-8.json");
        case 9:
          return import("./2021-9.json");
        case 10:
          return import("./2021-10.json");
        case 11:
          return import("./2021-11.json");
        case 12:
          return import("./2021-12.json");
        default:
          throw new Error(`${year}-${month}.json is not found`);
      }
    case 2022:
      switch (month) {
        case 1:
          return import("./2022-1.json");
        case 2:
          return import("./2022-2.json");
        case 3:
          return import("./2022-3.json");
        default:
          throw new Error(`${year}-${month}.json is not found`);
      }
    default:
      throw new Error(`${year}-${month}.json is not found`);
  }
}
