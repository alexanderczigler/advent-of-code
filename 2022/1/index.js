const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

const elves = [];
let elf = 0;

lines.forEach((line) => {
  const calories = parseInt(line);

  if (!elves[elf]) {
    elves[elf] = 0;
  }

  if (!calories) {
    elf++;
  } else {
    elves[elf] += calories;
  }
});

const max = Math.max(...elves);

console.log(`The elf carrying most calories has ${max} calories.`);
