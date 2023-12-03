const { assert } = require("console");

function getDigits(num) {
  let digits = 0;

  while (num > 0) {
    num = Math.floor(num / 10);
    digits++;
  }

  return digits;
}

module.exports = getDigits;

assert(getDigits(1) === 1);
assert(getDigits(13) === 2);
assert(getDigits(133) === 3);
assert(getDigits(1337) === 4);

assert(getDigits(1) === 1);
assert(getDigits(10) === 2);
assert(getDigits(100) === 3);
assert(getDigits(1001) === 4);
