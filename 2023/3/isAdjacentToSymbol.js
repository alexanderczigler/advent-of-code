const assert = require("assert");
const isNumber = require("./isNumber");

function isAdjacentToSymbol(schematic, line, col) {
  for (let l = line - 1; l <= line + 1; l++) {
    if (l < 0) {
      continue;
    }

    for (let c = col - 1; c <= col + 1; c++) {
      if (c < 0) {
        continue;
      }

      if (l === line && c === col) {
        continue;
      }

      if (l < 0 || c < 0) {
        continue;
      }

      if (l >= schematic.length || c >= schematic[l].length) {
        continue;
      }

      if (schematic[l][c] !== "." && !isNumber(schematic[l][c])) {
        return true;
      }
    }
  }

  return false;
}

module.exports = isAdjacentToSymbol;

assert(
  isAdjacentToSymbol(
    [
      [".", ".", "."],
      [".", "*", "."],
      [".", ".", "."],
    ],
    0,
    0
  ) === true
);

assert(
  isAdjacentToSymbol(
    [
      [".", ".", "."],
      [".", ".", "."],
      [".", ".", "."],
    ],
    0,
    0
  ) === false
);

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

assert(isAdjacentToSymbol(testSchematic, 0, 0) === false);
assert(isAdjacentToSymbol(testSchematic, 0, 2) === true);
assert(isAdjacentToSymbol(testSchematic, 0, 3) === true);
assert(isAdjacentToSymbol(testSchematic, 0, 4) === true);
assert(isAdjacentToSymbol(testSchematic, 4, 2) === true);
assert(isAdjacentToSymbol(testSchematic, 4, 4) === true);
assert(isAdjacentToSymbol(testSchematic, 9, 9) === false);
