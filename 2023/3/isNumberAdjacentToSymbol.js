const assert = require("assert");
const getNumber = require("./getNumber");
const isNumber = require("./isNumber");
const isAdjacentToSymbol = require("./isAdjacentToSymbol");

function isNumberAdjacentToSymbol(schematic, line, col) {
  for (let l = line - 1; l <= line + 1; l++) {
    if (l < 0) {
      continue;
    }

    for (let c = col - 1; c <= col + 1; c++) {
      if (c < 0) {
        continue;
      }

      if (isNumber(schematic[l][c])) {
        const number = getNumber(schematic[l], c);

        if (number < 10) {
          return isAdjacentToSymbol(schematic, l, c);
        } else if (number < 100) {
          return (
            isAdjacentToSymbol(schematic, l, c) ||
            isAdjacentToSymbol(schematic, l, c + 1)
          );
        } else if (number < 1000) {
          return (
            isAdjacentToSymbol(schematic, l, c) ||
            isAdjacentToSymbol(schematic, l, c + 1) ||
            isAdjacentToSymbol(schematic, l, c + 2)
          );
        }
      }
    }
  }
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

assert(isNumberAdjacentToSymbol(testSchematic, 0, 0) === true);
assert(isNumberAdjacentToSymbol(testSchematic, 0, 5) === false);
assert(isNumberAdjacentToSymbol(testSchematic, 2, 2) === true);
assert(isNumberAdjacentToSymbol(testSchematic, 2, 6) === true);
assert(isNumberAdjacentToSymbol(testSchematic, 4, 0) === true);
