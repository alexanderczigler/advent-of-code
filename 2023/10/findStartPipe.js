const assert = require("assert");
const getPipeMatrix = require("./getPipeMatrix");

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

function findStartPipe(pipeMatrix) {
  for (let i = 0; i < pipeMatrix.length; i++) {
    for (let j = 0; j < pipeMatrix[i].length; j++) {
      if (pipeMatrix[i][j] === "S") {
        return { x: j, y: i };
      }
    }
  }
}

assert(findStartPipe(getPipeMatrix(testInput1)).x === 1);
assert(findStartPipe(getPipeMatrix(testInput1)).y === 1);

assert(findStartPipe(getPipeMatrix(testInput2)).x === 0);
assert(findStartPipe(getPipeMatrix(testInput2)).y === 2);

module.exports = findStartPipe;
