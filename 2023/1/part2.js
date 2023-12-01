const readline = require("readline");
const fs = require("fs");

const input = "./input";

const readInterface = readline.createInterface({
  input: fs.createReadStream(input),
  console: false,
});

const numberMapper = {
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
  console.log("✨", answer);
});
