const assert = require("assert");

function getLocationForSeed(plantStructure, seed) {
  const soil = mapSourceToDestination(plantStructure, "seedToSoilMap", seed);
  const fertilizer = mapSourceToDestination(
    plantStructure,
    "soilToFertilizerMap",
    soil
  );
  const water = mapSourceToDestination(
    plantStructure,
    "fertilizerToWaterMap",
    fertilizer
  );
  const light = mapSourceToDestination(
    plantStructure,
    "waterToLightMap",
    water
  );
  const temperature = mapSourceToDestination(
    plantStructure,
    "lightToTemperatureMap",
    light
  );
  const humidity = mapSourceToDestination(
    plantStructure,
    "temperatureToHumidityMap",
    temperature
  );
  const location = mapSourceToDestination(
    plantStructure,
    "humidityToLocationMap",
    humidity
  );

  return location;
}

function mapSourceToDestination(plantStructure, map, source) {
  if (plantStructure[map][source]) {
    return plantStructure[map][source];
  }

  return source;
}

assert(
  mapSourceToDestination(
    {
      seedToSoilMap: { 1: 2 },
      soilToFertilizerMap: {},
      fertilizerToWaterMap: {},
      waterToLightMap: {},
      lightToTemperatureMap: {},
      temperatureToHumidityMap: {},
      humidityToLocationMap: {},
    },
    "seedToSoilMap",
    1
  ) === 2
);

assert(
  getLocationForSeed(
    {
      seedToSoilMap: { 1: 2 },
      soilToFertilizerMap: {},
      fertilizerToWaterMap: {},
      waterToLightMap: {},
      lightToTemperatureMap: {},
      temperatureToHumidityMap: {},
      humidityToLocationMap: {},
    },
    1
  ) === 2
);

assert(
  getLocationForSeed(
    {
      seedToSoilMap: { 1: 2 },
      soilToFertilizerMap: { 2: 40 },
      fertilizerToWaterMap: {},
      waterToLightMap: {},
      lightToTemperatureMap: { 40: 1337 },
      temperatureToHumidityMap: {},
      humidityToLocationMap: { 1337: 13337 },
    },
    1
  ) === 13337
);

module.exports = getLocationForSeed;
