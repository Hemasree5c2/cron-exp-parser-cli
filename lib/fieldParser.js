//evaluate asterisk expression
const evaluateAsterisk = (range) => {
  let output = "";
  for (let i = range.start; i <= range.end; i++) {
    output += i + " ";
  }
  return output;
};

//evaluate comma expression
const evaluateComma = (field, range) => {
  const nums = field.split(",").map((num) => {
    if (num < range.start || num > range.end) {
      throw new Error("Invalid cron expression");
    }
    return parseInt(num);
  });
  return nums.join(" ");
};

//evaluate hyphen expression
const evaluateHyphen = (field, range) => {
  let output = "";
  const [first, second] = field.split("-").map((num) => parseInt(num));
  if (first < range.start || second > range.end) {
    throw new Error("Invalid cron expression");
  }
  for (let i = first; i <= second; i++) {
    output += i + " ";
  }
  return output;
};

//evaluate slash expression
const evaluateSlash = (field, range) => {
  let output = "";
  const [first, second] = field
    .split("/")
    .map((num) => (num == "*" ? 0 : parseInt(num)));
  if (first < range.start || second > range.end) {
    throw new Error("Invalid cron expression");
  }
  for (let i = first; i <= range.end; i = i + second) {
    output += i + " ";
  }
  return output;
};

module.exports = {
  evaluateAsterisk,
  evaluateComma,
  evaluateHyphen,
  evaluateSlash,
};
