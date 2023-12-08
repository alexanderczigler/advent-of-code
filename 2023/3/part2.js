const assert = require("assert");

const testInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

function getMatrix(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
}

assert(getMatrix(testInput).length === 10);
assert(getMatrix(testInput)[0].length === 10);
assert(getMatrix(testInput)[0][0] === "4");
assert(getMatrix(testInput)[0][1] === "6");
assert(getMatrix(testInput)[0][2] === "7");
assert(getMatrix(testInput)[1][0] === ".");
assert(getMatrix(testInput)[1][1] === ".");
assert(getMatrix(testInput)[1][2] === ".");
assert(getMatrix(testInput)[1][3] === "*");

function findAdjacentNumbers(input, x, y) {
  const matrix = getMatrix(input);
  const rows = matrix.length;
  const cols = matrix[0].length;
  // Adding diagonal directions
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1], // Up, down, left, right
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1], // Diagonals
  ];
  const foundNumbers = new Set();

  directions.forEach(([dx, dy]) => {
    let newX = x + dx;
    let newY = y + dy;
    let number = "";

    while (
      newX >= 0 &&
      newX < rows &&
      newY >= 0 &&
      newY < cols &&
      isDigit(matrix[newX][newY])
    ) {
      number += matrix[newX][newY];
      newX += dx;
      newY += dy;
    }

    if (number) {
      foundNumbers.add(parseInt(number, 10));
    }
  });

  console.log("Hello", foundNumbers);
  return Array.from(foundNumbers);
}

function isDigit(char) {
  return char >= "0" && char <= "9";
}

assert(findAdjacentNumbers(testInput, 1, 3).length === 2);
assert(findAdjacentNumbers(testInput, 1, 3)[0] === 467);
assert(findAdjacentNumbers(testInput, 1, 3)[1] === 35);
assert(findAdjacentNumbers(testInput, 8, 5).length === 2);
assert(findAdjacentNumbers(testInput, 8, 5)[0] === 755);
assert(findAdjacentNumbers(testInput, 8, 5)[1] === 598);
