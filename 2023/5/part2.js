const assert = require("assert");
const input = require("../input");
const getRangeMap = require("./getRangeMap");
const getLocationForSeed = require("./getLocationForSeed");
const getSeedPairs = require("./getSeedPairs");
const readInterface = input.reader("5");

const plantStructure = {
  seedPairs: [],
  seedToSoilMap: [],
  soilToFertilizerMap: [],
  fertilizerToWaterMap: [],
  waterToLightMap: [],
  lightToTemperatureMap: [],
  temperatureToHumidityMap: [],
  humidityToLocationMap: [],
};

let currentMap = "";
readInterface.on("line", function (line) {
  if (line.startsWith("seeds")) {
    plantStructure.seedPairs = getSeedPairs(line);
  } else if (!line) {
    currentMap = "";
  } else if (line.endsWith("map:")) {
    currentMap = getCurrentMap(line);
  } else {
    const rangeMap = getRangeMap(line);
    plantStructure[currentMap].push(rangeMap);
  }
});

function getCurrentMap(line) {
  switch (line) {
    case "seed-to-soil map:":
      return "seedToSoilMap";
    case "soil-to-fertilizer map:":
      return "soilToFertilizerMap";
    case "fertilizer-to-water map:":
      return "fertilizerToWaterMap";
    case "water-to-light map:":
      return "waterToLightMap";
    case "light-to-temperature map:":
      return "lightToTemperatureMap";
    case "temperature-to-humidity map:":
      return "temperatureToHumidityMap";
    case "humidity-to-location map:":
      return "humidityToLocationMap";
    default:
      break;
  }
}

assert(getCurrentMap("seed-to-soil map:") === "seedToSoilMap");
assert(getCurrentMap("soil-to-fertilizer map:") === "soilToFertilizerMap");
assert(getCurrentMap("fertilizer-to-water map:") === "fertilizerToWaterMap");
assert(getCurrentMap("water-to-light map:") === "waterToLightMap");
assert(getCurrentMap("light-to-temperature map:") === "lightToTemperatureMap");
assert(
  getCurrentMap("temperature-to-humidity map:") === "temperatureToHumidityMap"
);
assert(getCurrentMap("humidity-to-location map:") === "humidityToLocationMap");

function getLocationsForSeeds(plantStructure) {
  return new Promise((resolve, reject) => {
    let lowestLocation = 0;

    plantStructure.seedPairs.forEach((seedPair) => {
      console.log("Go through seed pair", seedPair);

      for (let i = seedPair.from; i <= seedPair.to; i++) {
        const location = getLocationForSeed(plantStructure, i);

        if (location < lowestLocation || lowestLocation === 0) {
          lowestLocation = location;
        }
      }
    });

    console.log("Done!");
    return resolve(lowestLocation);
  });
}

readInterface.on("close", function () {
  getLocationsForSeeds(plantStructure)
    .then((lowestLocation) => {
      console.log("lowest", lowestLocation);

      // assert(lowestLocation === 525792406);
      // console.log(`✨ The lowest location is ${lowestLocation}`);
    })
    .catch((err) => {
      console.log(err);
    });
});
