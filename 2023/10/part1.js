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

function step(pipe, origin) {
  if (pipe.shape === "L") {
    if (pipe.x === origin.x) {
      return { x: pipe.x + 1, y: pipe.y };
    } else {
      return { x: pipe.x, y: pipe.y - 1 };
    }
  }

  if (pipe.shape === "F") {
    if (pipe.x === origin.x) {
      return { x: pipe.x + 1, y: pipe.y };
    } else {
      return { x: pipe.x, y: pipe.y + 1 };
    }
  }

  if (pipe.shape === "-") {
    if (pipe.x > origin.x) {
      return { x: pipe.x + 1, y: pipe.y };
    } else {
      return { x: pipe.x - 1, y: pipe.y };
    }
  }

  if (pipe.shape === "|") {
    if (pipe.y > origin.y) {
      return { y: pipe.y + 1, x: pipe.x };
    } else {
      return { y: pipe.y - 1, x: pipe.x };
    }
  }

  if (pipe.shape === "7") {
    if (pipe.x === origin.x) {
      return { x: pipe.x - 1, y: pipe.y };
    } else {
      return { x: pipe.x, y: pipe.y + 1 };
    }
  }

  if (pipe.shape === "J") {
    if (pipe.x === origin.x) {
      return { x: pipe.x - 1, y: pipe.y };
    } else {
      return { x: pipe.x, y: pipe.y - 1 };
    }
  }
}

assert(step({ shape: "F", x: 1, y: 1 }, { x: 2, y: 1 }).x === 1);
assert(step({ shape: "F", x: 1, y: 1 }, { x: 2, y: 1 }).y === 2);
assert(step({ shape: "F", x: 1, y: 1 }, { x: 1, y: 0 }).x === 2);
assert(step({ shape: "F", x: 1, y: 1 }, { x: 1, y: 0 }).y === 1);

assert(step({ shape: "L", x: 1, y: 1 }, { x: 2, y: 1 }).x === 1);
assert(step({ shape: "L", x: 1, y: 1 }, { x: 2, y: 1 }).y === 0);
assert(step({ shape: "L", x: 1, y: 1 }, { x: 1, y: 0 }).x === 2);
assert(step({ shape: "L", x: 1, y: 1 }, { x: 1, y: 0 }).y === 1);

assert(step({ shape: "-", x: 1, y: 1 }, { x: 0, y: 1 }).x === 2);
assert(step({ shape: "-", x: 1, y: 1 }, { x: 0, y: 1 }).y === 1);
assert(step({ shape: "-", x: 1, y: 1 }, { x: 2, y: 1 }).x === 0);
assert(step({ shape: "-", x: 1, y: 1 }, { x: 2, y: 1 }).y === 1);

assert(step({ shape: "7", x: 1, y: 1 }, { x: 1, y: 2 }).x === 0);
assert(step({ shape: "7", x: 1, y: 1 }, { x: 1, y: 2 }).y === 1);
assert(step({ shape: "7", x: 1, y: 1 }, { x: 2, y: 1 }).x === 1);
assert(step({ shape: "7", x: 1, y: 1 }, { x: 2, y: 1 }).y === 2);

assert(step({ shape: "J", x: 1, y: 1 }, { x: 1, y: 0 }).x === 0);
assert(step({ shape: "J", x: 1, y: 1 }, { x: 1, y: 0 }).y === 1);
assert(step({ shape: "J", x: 1, y: 1 }, { x: 2, y: 1 }).x === 1);
assert(step({ shape: "J", x: 1, y: 1 }, { x: 2, y: 1 }).y === 0);

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

function countSteps(pipeMatrix, startPipe) {
  let steps = 0;
  let [i, j] = getStartLocation(pipeMatrix);
  const startLocation = [i, j];

  while (true) {
    if (steps > 0 && pipeMatrix[i][j] === "S") {
    }
    if (pipeMatrix[i][j] === "F") {
      i--;
    }
    if (pipeMatrix[i][j] === "J") {
      i++;
    }
    if (pipeMatrix[i][j] === "L") {
      j--;
    }
    if (pipeMatrix[i][j] === "-") {
      j++;
    }
    steps++;
  }
}
