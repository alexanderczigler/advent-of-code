const readline = require("readline");
const fs = require("fs");

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
  console.log("✨", answer);
});
