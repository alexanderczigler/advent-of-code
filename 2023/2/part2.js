const assert = require("assert");
const input = require("../input");
const readInterface = input.reader(2);

const minimumNumberOfRequiredCubes = {};

const getMinimumNumberOfRequiredCubes = (line) => {
  const unparsedSets = line.split(":")[1].split(";");

  const minimum = {
    red: 0,
    green: 0,
    blue: 0,
  };

  unparsedSets.forEach((set) => {
    const cubes = set.split(",");
    cubes.forEach((cube) => {
      let amount = parseInt(cube.split(" ")[1]);
      let color = cube.split(" ")[2];

      if (minimum[color] < amount) {
        minimum[color] = amount;
      }
    });
  });

  return minimum;
};

readInterface.on("line", function (line) {
  const gameId = parseInt(line.split(" ")[1].replace(":", ""));
  assert(typeof gameId === "number", "Game id should be a number");

  minimumNumberOfRequiredCubes[gameId] = getMinimumNumberOfRequiredCubes(line);
});

readInterface.on("close", () => {
  let sum = 0;

  Object.keys(minimumNumberOfRequiredCubes).forEach((game) => {
    const power =
      minimumNumberOfRequiredCubes[game].red *
      minimumNumberOfRequiredCubes[game].green *
      minimumNumberOfRequiredCubes[game].blue;

    sum += power;
  });

  assert(sum === 83435, "Sum should be 83435");
  console.log("✨", sum);
});

const game1 =
  "Game 1: 10 green, 9 blue, 1 red; 1 red, 7 green; 11 green, 6 blue; 8 blue, 12 green";
const game40 =
  "Game 40: 7 green, 10 red, 3 blue; 2 blue, 1 red, 7 green; 2 red, 5 blue, 11 green; 4 blue, 12 red, 6 green; 13 green, 7 blue, 9 red; 14 blue, 7 green, 8 red";

assert(getMinimumNumberOfRequiredCubes(game1).red === 1);
assert(getMinimumNumberOfRequiredCubes(game1).green === 12);
assert(getMinimumNumberOfRequiredCubes(game1).blue === 9);

assert(getMinimumNumberOfRequiredCubes(game40).red === 12);
assert(getMinimumNumberOfRequiredCubes(game40).green === 13);
assert(getMinimumNumberOfRequiredCubes(game40).blue === 14);
