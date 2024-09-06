const { table, getBorderCharacters } = require("table");
const { CRON_FIELD_NAMES, CRON_FIELD_RANGES } = require("./constants");
const {
  evaluateAsterisk,
  evaluateComma,
  evaluateHyphen,
  evaluateSlash,
} = require("./fieldParser");
//parse input cron expression
function parseCronExpression(args) {
  //validate input
  if (args.length == 0) {
    return null;
  }
  const expressions = args[0].split(" ");
  if (expressions.length != 6) {
    throw new Error("Invalid cron expression");
  }
  //iterate over expression fields and parse them
  const data = [];
  for (let i = 0; i < expressions.length - 1; i++) {
    const field = expressions[i];
    const range = CRON_FIELD_RANGES[i];
    let outputVal = "";
    if (field.includes("/")) {
      outputVal = evaluateSlash(field, range);
    } else if (field.includes("*")) {
      outputVal = evaluateAsterisk(range);
    } else if (field.includes(",")) {
      outputVal = evaluateComma(field, range);
    } else if (field.includes("-")) {
      outputVal = evaluateHyphen(field, range);
    } else {
      outputVal = field;
    }
    data.push([CRON_FIELD_NAMES[i], outputVal]);
  }
  data.push(["command", expressions[expressions.length - 1]]);
  return data;
}

function parseAndConstructTable(args) {
  try {
    const data = parseCronExpression(args);
    //log the output in table format
    const tableData = table(data, {
      border: getBorderCharacters(`norc`),
      columns: { 0: { width: 14 } },
    });
    console.log(tableData);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { parseCronExpression, parseAndConstructTable };
