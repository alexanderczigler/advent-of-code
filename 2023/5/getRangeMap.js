const assert = require("assert");

function getRangeMap(line) {
  const { source, destination } = getRanges(line);

  const rangeMap = {};

  for (let i = 0; i < source.length; i++) {
    rangeMap[source[i]] = destination[i];
  }

  return rangeMap;
}

function getRanges(line) {
  const values = line.split(" ").map((value) => parseInt(value));
  const length = values[2];

  let destination = [];
  let source = [];

  for (let i = values[0]; i < values[0] + length; i++) {
    destination.push(i);
  }

  for (let i = values[1]; i < values[1] + length; i++) {
    source.push(i);
  }

  return {
    source,
    destination,
  };
}

assert(getRanges("1 10 3").destination.length === 3);
assert(getRanges("1 10 3").destination[0] === 1);
assert(getRanges("1 10 3").destination[1] === 2);
assert(getRanges("1 10 3").destination[2] === 3);

assert(getRanges("1 10 3").source.length === 3);
assert(getRanges("1 10 3").source[0] === 10);
assert(getRanges("1 10 3").source[1] === 11);
assert(getRanges("1 10 3").source[2] === 12);

assert(getRanges("50 98 2").destination.length === 2);
assert(getRanges("50 98 2").destination[0] === 50);
assert(getRanges("50 98 2").destination[1] === 51);

assert(getRanges("50 98 2").source.length === 2);
assert(getRanges("50 98 2").source[0] === 98);
assert(getRanges("50 98 2").source[1] === 99);

assert(getRangeMap("1 10 3")[11] === 2);
assert(getRangeMap("1 10 3")[12] === 3);

assert(getRangeMap("50 98 2")[98] === 50);

module.exports = getRangeMap;
