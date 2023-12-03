const assert = require("assert");
const input = require("../input");
const isNumber = require("./isNumber");
const getNumber = require("./getNumber");
const isNumberAdjacentToSymbol = require("./isNumberAdjacentToSymbol");
const getDigits = require("./getDigits");
const readInterface = input.reader(3);

let i = 0;
const schematic = [];
readInterface.on("line", function (line) {
  schematic[i] = [];

  line.split("").forEach((char) => {
    schematic[i].push(char);
  });

  i++;
});

function getPartNumberSum(from) {
  let col = 0;
  let line = 0;
  let iterations = 0;
  let sum = 0;

  while (true) {
    iterations++;
    if (col > from[line].length - 1) {
      col = 0;
      line++;
    }

    if (isNumber(from[line][col])) {
      const number = parseInt(getNumber(from[line], col));

      if (isNumberAdjacentToSymbol(from, line, col)) {
        console.log("number", number, "is adjacent to symbol");
        sum += number;

        col += getDigits(number);
        continue;
      }
    }

    col++;

    if (line >= from.length - 1 && col > from[line].length - 1) {
      break;
    }
  }

  return sum;
}

const testSchematic = [];
testSchematic[0] = ["4", "6", "7", ".", ".", "1", "1", "4", ".", "."];
testSchematic[1] = [".", ".", ".", "*", ".", ".", ".", ".", ".", "."];
testSchematic[2] = [".", ".", "3", "5", ".", ".", "6", "3", "3", "."];
testSchematic[3] = [".", ".", ".", ".", ".", ".", "#", ".", ".", "."];
testSchematic[4] = ["6", "1", "7", "*", ".", ".", ".", ".", ".", "."];
testSchematic[5] = [".", ".", ".", ".", ".", "+", ".", "5", "8", "."];
testSchematic[6] = [".", ".", "5", "9", "2", ".", ".", ".", ".", "."];
testSchematic[7] = [".", ".", ".", ".", ".", ".", "7", "5", "5", "."];
testSchematic[8] = [".", ".", ".", "$", ".", "*", ".", ".", ".", "."];
testSchematic[9] = [".", "6", "6", "4", ".", "5", "9", "8", ".", "."];

const testSchematic2 = [];
testSchematic2[0] = ["1", "0", "0", ".", ".", "1", "0", "1", ".", "."];
testSchematic2[1] = [".", ".", ".", "*", ".", ".", ".", "/", ".", "."];
testSchematic2[2] = [".", ".", "1", "0", ".", ".", "1", "0", "3", "."];

assert(getPartNumberSum(testSchematic) === 4361);
assert(getPartNumberSum(testSchematic2) === 314);

readInterface.on("close", () => {
  const sum = getPartNumberSum(schematic);
  assert(sum === 540025);

  console.log(`✨ The sum of part numbers is ${sum}`);
});
