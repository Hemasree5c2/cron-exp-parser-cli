const MINUTE_RANGES = { start: 0, end: 59 };
const HOUR_RANGES = { start: 0, end: 23 };
const DAY_RANGES = { start: 1, end: 30 };
const MONTH_RANGES = { start: 1, end: 12 };
const WEEK_RANGES = { start: 1, end: 7 };
const CRON_FIELD_RANGES = [
  MINUTE_RANGES,
  HOUR_RANGES,
  DAY_RANGES,
  MONTH_RANGES,
  WEEK_RANGES,
];
const CRON_FIELD_NAMES = [
  "minute",
  "hour",
  "day of month",
  "month",
  "day of week",
];

module.exports = { CRON_FIELD_NAMES, CRON_FIELD_RANGES };
