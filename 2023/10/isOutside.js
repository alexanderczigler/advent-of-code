const assert = require("assert");
const getPipeCoordinates = require("./getPipeCoordinates");
const getPipeMatrix = require("./getPipeMatrix");
const findStartPipe = require("./findStartPipe");

const testInput1 = `
.....
.S-7.
.|.|.
.L-J.
.....
`;

const testInput2 = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;

function isOutside(coordinate, pipeCoordinates, matrix) {
  for (let i = 0; i < pipeCoordinates.length; i++) {
    if (
      coordinate.x === pipeCoordinates[i].x &&
      coordinate.y === pipeCoordinates[i].y
    ) {
      // Pipe.
      return false;
    }
  }

  if (coordinate.x === 0 || coordinate.y === 0) {
    // Edge of map.
    return true;
  }

  if (coordinate.x === matrix[0].length - 1) {
    // Edge of map.
    return true;
  }

  if (coordinate.y === matrix.length - 1) {
    // Edge of map.
    return true;
  }

  return false;
}

const testMatrix1 = getPipeMatrix(testInput1);
const s1 = findStartPipe(testMatrix1);
const start1 = { x: 2, y: 1 };
const testCoordinates1 = getPipeCoordinates(testMatrix1, s1, start1);

const testMatrix2 = getPipeMatrix(testInput2);
const s2 = findStartPipe(testMatrix2);
const start2 = { x: 1, y: 2 };
const testCoordinates2 = getPipeCoordinates(testMatrix2, s2, start2);

assert(isOutside({ x: 0, y: 0 }, testCoordinates1, testMatrix1));
assert(isOutside({ x: 1, y: 0 }, testCoordinates1, testMatrix1));
assert(isOutside({ x: 2, y: 0 }, testCoordinates1, testMatrix1));
assert(isOutside({ x: 3, y: 0 }, testCoordinates1, testMatrix1));
assert(isOutside({ x: 0, y: 1 }, testCoordinates1, testMatrix1));
assert(isOutside({ x: 4, y: 0 }, testCoordinates1, testMatrix1));
assert(isOutside({ x: 4, y: 1 }, testCoordinates1, testMatrix1));

module.exports = isOutside;
