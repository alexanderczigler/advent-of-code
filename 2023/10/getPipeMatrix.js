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

function getPipeMatrix(input) {
  return input
    .trim()
    .split("\n")
    .map((row) => row.split(""));
}

assert(getPipeMatrix(testInput1)[0][0] === ".");
assert(getPipeMatrix(testInput1)[1][0] === ".");
assert(getPipeMatrix(testInput1)[1][1] === "S");
assert(getPipeMatrix(testInput1)[1][2] === "-");
assert(getPipeMatrix(testInput1)[1][3] === "7");
assert(getPipeMatrix(testInput1)[1][4] === ".");

module.exports = getPipeMatrix;
