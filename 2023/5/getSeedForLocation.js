const assert = require("assert");

function getSeedForLocation(plantStructure, location) {
  const humidity = mapDestinationToSource(
    plantStructure.humidityToLocationMap,
    location
  );
  const temperature = mapDestinationToSource(
    plantStructure.temperatureToHumidityMap,
    humidity
  );
  const light = mapDestinationToSource(
    plantStructure.lightToTemperatureMap,
    temperature
  );
  const water = mapDestinationToSource(plantStructure.waterToLightMap, light);
  const fertilizer = mapDestinationToSource(
    plantStructure.fertilizerToWaterMap,
    water
  );
  const soil = mapDestinationToSource(
    plantStructure.soilToFertilizerMap,
    fertilizer
  );
  const seed = mapDestinationToSource(plantStructure.seedToSoilMap, soil);
  return seed;
}

function mapDestinationToSource(rangeMap, destination) {
  let source = destination;

  rangeMap.forEach((map) => {
    if (destination < map.destination) {
      return;
    }

    if (destination > map.destination + map.range - 1) {
      return;
    }

    source = map.source + (destination - map.destination);
  });

  return source;
}

module.exports = getSeedForLocation;

const rangeMapTest1 = [
  {
    destination: 50,
    source: 10,
    range: 20,
  },
];

assert(mapDestinationToSource(rangeMapTest1, 1) === 1);
assert(mapDestinationToSource(rangeMapTest1, 10) === 10);
assert(mapDestinationToSource(rangeMapTest1, 50) === 10);
assert(mapDestinationToSource(rangeMapTest1, 69) === 29);
assert(mapDestinationToSource(rangeMapTest1, 70) === 70);
assert(mapDestinationToSource(rangeMapTest1, 1000) === 1000);
