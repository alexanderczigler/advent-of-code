const assert = require("assert");

function getSeeds(line) {
  return line
    .split(": ")[1]
    .split(" ")
    .map((seed) => parseInt(seed));
}

const getSeedsTest = "seeds: 79 14 55 13";
assert(getSeeds(getSeedsTest).length === 4);
assert(getSeeds(getSeedsTest)[0] === 79);
assert(getSeeds(getSeedsTest)[1] === 14);
assert(getSeeds(getSeedsTest)[2] === 55);
assert(getSeeds(getSeedsTest)[3] === 13);

module.exports = getSeeds;
