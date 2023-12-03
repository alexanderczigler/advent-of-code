const assert = require("assert");

function isNumber(str) {
  var value = false;

  if (!str) {
    return value;
  }

  if (str.length > 0) {
    if (!isNaN(str)) {
      value = true;
    }
  }

  return value;
}

module.exports = isNumber;

assert(isNumber("0"));
assert(isNumber("1"));
assert(isNumber("2"));
assert(isNumber("3"));
assert(isNumber("4"));
assert(isNumber("5"));
assert(isNumber("6"));
assert(isNumber("7"));
assert(isNumber("8"));
assert(isNumber("9"));
assert(isNumber("10"));
assert(isNumber("101"));
assert(isNumber("1001"));

assert(!isNumber("*"));
assert(!isNumber("="));
assert(!isNumber("-"));
