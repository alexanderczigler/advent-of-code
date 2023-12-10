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

function countSteps(pipeMatrix, s, start) {
  let steps = 1;
  let currentLocation = { ...start };
  let previousLocation = { ...s };

  while (true) {
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

    pipeMatrix[previousLocation.y][previousLocation.x] = " ";

    // console.log(`At ${currentLocation.x}, ${currentLocation.y}`);

    steps++;
    if (currentLocation.x === s.x && currentLocation.y === s.y) {
      return steps;
    }
  }
}

const testMatrix1 = getPipeMatrix(testInput1);
const s1 = findStartPipe(testMatrix1);
const start1 = { x: 2, y: 1 };
const testSteps1 = countSteps(testMatrix1, s1, start1) / 2;
assert(testSteps1 === 4);

const testMatrix2 = getPipeMatrix(testInput2);
const s2 = findStartPipe(testMatrix2);
const start2 = { x: 1, y: 2 };
const testSteps2 = countSteps(testMatrix2, s2, start2) / 2;
assert(testSteps2 === 8);

module.exports = countSteps;
