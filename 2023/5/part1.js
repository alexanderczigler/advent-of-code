const input = require("../input");
const getSeeds = require("./getSeeds");
const readInterface = input.reader("5.test");

const plantStructure = {
  seeds: [],
};

readInterface.on("line", function (line) {
  if (line.startsWith("seeds")) {
    plantStructure.seeds = getSeeds(line);
  }
});

readInterface.on("close", function () {
  console.log(plantStructure);
});
