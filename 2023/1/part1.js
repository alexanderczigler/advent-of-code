const readline = require("readline");
const fs = require("fs");
const assert = require("assert");

const input = "./input";

const readInterface = readline.createInterface({
  input: fs.createReadStream(input),
  output: process.stdout,
  console: false,
});

let answer = 0;

readInterface.on("line", function (line) {
  let replaceLine = `${line}`;

  const lineWithOnlyNumbers = replaceLine.replace(/[^0-9]/g, "");
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
  const expectedAnswer = 54990;
  assert(answer === expectedAnswer, `Wrong answer, expected ${expectedAnswer}`);
  console.log("✨", answer);
});
