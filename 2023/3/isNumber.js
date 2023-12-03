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

assert(isNumber("12"));
assert(!isNumber("*"));
assert(!isNumber("="));
assert(!isNumber("-"));
