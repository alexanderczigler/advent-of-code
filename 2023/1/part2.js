const assert = require("assert");
const input = require("../input");
const readInterface = input.reader(1);

const numberMapper = {
  oneight: 18,
  twone: 21,
  fiveight: 58,
  eightwo: 82,
  eighthree: 83,
  nineight: 98,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const numbers = Object.keys(numberMapper);
let answer = 0;

readInterface.on("line", function (line) {
  let replaceLine = `${line}`;

  // Replace each number spelled out with letters by the number.
  numbers.forEach((number) => {
    if (line.includes(number)) {
      replaceLine = replaceLine.replace(
        new RegExp(number, "g"),
        numberMapper[number]
      );
    }
  });

  // Create a line with only numbers.
  const lineWithOnlyNumbers = replaceLine.replace(/[^0-9]/g, "");

  // Get first and last numbers.
  const firstNumber = lineWithOnlyNumbers[0];
  let lastNumber = lineWithOnlyNumbers[lineWithOnlyNumbers.length - 1];

  let lineNumber = 0;
  if (firstNumber === lastNumber) {
    lineNumber = parseInt(`${firstNumber}${firstNumber}`);
  } else {
    lineNumber = parseInt(`${firstNumber}${lastNumber}`);
  }

  console.log(line, lineWithOnlyNumbers, firstNumber, lastNumber, lineNumber);
  answer += lineNumber;
});

readInterface.on("close", () => {
  const expectedAnswer = 54473;
  assert(answer === expectedAnswer, `Wrong answer, expected ${expectedAnswer}`);
  console.log("✨", answer);
});
