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

function isPipe(coordinate, pipeCoordinates) {
  return pipeCoordinates.some(
    (c) => c.x === coordinate.x && c.y === coordinate.y
  );
}

const testMatrix1 = getPipeMatrix(testInput1);
const s1 = findStartPipe(testMatrix1);
const start1 = { x: 2, y: 1 };
const testCoordinates1 = getPipeCoordinates(testMatrix1, s1, start1);

const testMatrix2 = getPipeMatrix(testInput2);
const s2 = findStartPipe(testMatrix2);
const start2 = { x: 2, y: 1 };
const testCoordinates2 = getPipeCoordinates(testMatrix2, s2, start2);

assert(isPipe({ x: 1, y: 1 }, testCoordinates1));
assert(isPipe({ x: 2, y: 1 }, testCoordinates1));
assert(isPipe({ x: 3, y: 1 }, testCoordinates1));
assert(isPipe({ x: 3, y: 2 }, testCoordinates1));
assert(isPipe({ x: 3, y: 3 }, testCoordinates1));
assert(isPipe({ x: 2, y: 3 }, testCoordinates1));
assert(isPipe({ x: 1, y: 3 }, testCoordinates1));
assert(isPipe({ x: 1, y: 2 }, testCoordinates1));

assert(isPipe({ x: 0, y: 2 }, testCoordinates2));
assert(isPipe({ x: 2, y: 1 }, testCoordinates2));
assert(isPipe({ x: 2, y: 0 }, testCoordinates2));
assert(isPipe({ x: 3, y: 0 }, testCoordinates2));
assert(isPipe({ x: 3, y: 1 }, testCoordinates2));
assert(isPipe({ x: 3, y: 2 }, testCoordinates2));
assert(isPipe({ x: 4, y: 2 }, testCoordinates2));
assert(isPipe({ x: 4, y: 3 }, testCoordinates2));
assert(isPipe({ x: 1, y: 3 }, testCoordinates2));
assert(isPipe({ x: 2, y: 3 }, testCoordinates2));
assert(isPipe({ x: 1, y: 3 }, testCoordinates2));
assert(isPipe({ x: 1, y: 4 }, testCoordinates2));
assert(isPipe({ x: 0, y: 4 }, testCoordinates2));
assert(isPipe({ x: 0, y: 3 }, testCoordinates2));

module.exports = isPipe;
