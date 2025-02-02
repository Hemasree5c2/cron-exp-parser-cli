const parser = require("../lib/expressionParser");

test("Every 15 minutes, between 12:00 AM and 12:59 AM, on day 1 and 15 of the month, Monday through Friday", () => {
  const result = parser.parseCronExpression([
    "*/15 0 1,15 * 1-5 /usr/bin/find",
  ]);
  expect(result).toEqual([
    ["minute", "0 15 30 45 "],
    ["hour", "0"],
    ["day of month", "1 15"],
    ["month", "1 2 3 4 5 6 7 8 9 10 11 12 "],
    ["day of week", "1 2 3 4 5 "],
    ["command", "/usr/bin/find"],
  ]);
});

test("Every minute, every hour, every day", () => {
  const result = parser.parseCronExpression(["* * * * * /find"]);
  expect(result).toEqual([
    [
      "minute",
      "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 ",
    ],
    ["hour", "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 "],
    [
      "day of month",
      "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 ",
    ],
    ["month", "1 2 3 4 5 6 7 8 9 10 11 12 "],
    ["day of week", "1 2 3 4 5 6 7 "],
    ["command", "/find"],
  ]);
});

test("invalid expression", () => {
  expect(() => parser.parseCronExpression(["* * * *"])).toThrow(
    "Invalid cron expression"
  );
});
