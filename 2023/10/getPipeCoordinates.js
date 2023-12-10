const assert = require("assert");
const getPipeMatrix = require("./getPipeMatrix");
const findStartPipe = require("./findStartPipe");
const step = require("./step");

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

function getPipeCoordinates(pipeMatrix, s, start) {
  const coordinates = [];
  let currentLocation = { ...start };
  let previousLocation = { ...s };

  while (true) {
    coordinates.push({ ...previousLocation });
    let nextLocation = step(
      {
        shape: pipeMatrix[currentLocation.y][currentLocation.x],
        x: currentLocation.x,
        y: currentLocation.y,
      },
      previousLocation
    );

    previousLocation = { ...currentLocation };
    currentLocation = { ...nextLocation };

    // Make pipe disappear.
    pipeMatrix[previousLocation.y][previousLocation.x] = " ";

    if (currentLocation.x === s.x && currentLocation.y === s.y) {
      coordinates.push({ ...previousLocation });
      return coordinates;
    }
  }
}

const testMatrix1 = getPipeMatrix(testInput1);
const s1 = findStartPipe(testMatrix1);
const start1 = { x: 2, y: 1 };
const testCoordinates1 = getPipeCoordinates(testMatrix1, s1, start1);

assert(testCoordinates1.length === 8);
assert(testCoordinates1[0].x === 1 && testCoordinates1[0].y === 1);
assert(testCoordinates1[1].x === 2 && testCoordinates1[1].y === 1);
assert(testCoordinates1[2].x === 3 && testCoordinates1[2].y === 1);
assert(testCoordinates1[3].x === 3 && testCoordinates1[3].y === 2);
assert(testCoordinates1[4].x === 3 && testCoordinates1[4].y === 3);
assert(testCoordinates1[5].x === 2 && testCoordinates1[5].y === 3);
assert(testCoordinates1[6].x === 1 && testCoordinates1[6].y === 3);
assert(testCoordinates1[7].x === 1 && testCoordinates1[7].y === 2);

const testMatrix2 = getPipeMatrix(testInput2);
const s2 = findStartPipe(testMatrix2);
const start2 = { x: 1, y: 2 };
const testCoordinates2 = getPipeCoordinates(testMatrix2, s2, start2);

assert(testCoordinates2.length === 16);
assert(testCoordinates2[0].x === 0 && testCoordinates2[0].y === 2);
assert(testCoordinates2[1].x === 1 && testCoordinates2[1].y === 2);
assert(testCoordinates2[2].x === 1 && testCoordinates2[2].y === 1);
assert(testCoordinates2[3].x === 2 && testCoordinates2[3].y === 1);
assert(testCoordinates2[4].x === 2 && testCoordinates2[4].y === 0);
assert(testCoordinates2[5].x === 3 && testCoordinates2[5].y === 0);
assert(testCoordinates2[6].x === 3 && testCoordinates2[6].y === 1);
assert(testCoordinates2[7].x === 3 && testCoordinates2[7].y === 2);

module.exports = getPipeCoordinates;
