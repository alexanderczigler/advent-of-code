const assert = require("assert");
const isNumber = require("./isNumber");

function getNumber(line, index) {
  if (isNumber(line[index])) {
    return parseInt(line[index] + getNumber(line, index + 1));
  }

  return "";
}

module.exports = getNumber;

assert(
  getNumber(["4", "6", "7", ".", "5", ".", "1", "4", ".", "."], 0) === 467
);
assert(getNumber(["4", "6", "7", ".", "5", ".", "1", "4", ".", "."], 4) === 5);
assert(getNumber(["4", "6", "7", ".", "5", ".", "1", "4", ".", "."], 6) === 14);
