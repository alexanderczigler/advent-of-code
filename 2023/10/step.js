const assert = require("assert");

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

  console.log("unknown pipe shape", pipe);
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

module.exports = step;
