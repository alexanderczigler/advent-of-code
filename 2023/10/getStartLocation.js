const assert = require("assert");

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

function getStartLocation(pipeMatrix) {
  for (let i = 0; i < pipeMatrix.length; i++) {
    for (let j = 0; j < pipeMatrix[i].length; j++) {
      if (pipeMatrix[i][j] === "S") {
        return [i, j];
      }
    }
  }
}

assert(getStartLocation(getPipeMatrix(testInput1))[0] === 1);
assert(getStartLocation(getPipeMatrix(testInput1))[1] === 1);

assert(getStartLocation(getPipeMatrix(testInput2))[0] === 2);
assert(getStartLocation(getPipeMatrix(testInput2))[1] === 0);

module.exports = getStartLocation;
