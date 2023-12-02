const readline = require("readline");
const fs = require("fs");
const assert = require("assert");

const input = "./input";

const readInterface = readline.createInterface({
  input: fs.createReadStream(input),
  console: false,
});

const numberOfCubesInBag = {
  red: 12,
  green: 13,
  blue: 14,
};

const gameIsPossible = (line) => {
  const unparsedSets = line.split(":")[1].split(";");

  let include = true;
  unparsedSets.forEach((set) => {
    const cubes = set.split(",");
    cubes.forEach((cube) => {
      let amount = cube.split(" ")[1];
      let color = cube.split(" ")[2];
      if (numberOfCubesInBag[color] < amount) {
        include = false;
      }
    });
  });

  return include;
};

assert(
  gameIsPossible(
    "Game 12: 16 red, 10 green; 12 red, 8 blue, 3 green; 8 red, 10 green, 7 blue; 10 green, 12 red"
  ) === false
);
assert(gameIsPossible("Game 24: 1 blue, 1 green; 1 blue; 1 red") === true);

let possibleGames = [];
readInterface.on("line", function (line) {
  const gameId = parseInt(line.split(" ")[1].replace(":", ""));
  assert(typeof gameId === "number", "Game id should be a number");

  if (gameIsPossible(line)) {
    possibleGames.push(gameId);
  }
});

readInterface.on("close", () => {
  assert(possibleGames.includes(1), "Game 1 is possible");

  let sumPossibleGameIds = possibleGames
    .map((gameId) => gameId)
    .reduce((a, b) => a + b, 0);

  console.log("✨", sumPossibleGameIds);
  assert(
    sumPossibleGameIds === 2239,
    "Sum of possible game ids should be 2239"
  );
});
