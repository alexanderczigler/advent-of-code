const assert = require("assert");

function getLocationForSeed(plantStructure, seed) {
  const soil = mapSourceToDestination(plantStructure.seedToSoilMap, seed);

  const fertilizer = mapSourceToDestination(
    plantStructure.soilToFertilizerMap,
    soil
  );

  const water = mapSourceToDestination(
    plantStructure.fertilizerToWaterMap,
    fertilizer
  );

  const light = mapSourceToDestination(plantStructure.waterToLightMap, water);

  const temperature = mapSourceToDestination(
    plantStructure.lightToTemperatureMap,
    light
  );

  const humidity = mapSourceToDestination(
    plantStructure.temperatureToHumidityMap,
    temperature
  );

  const location = mapSourceToDestination(
    plantStructure.humidityToLocationMap,
    humidity
  );

  return location;
}

function mapSourceToDestination(rangeMap, source) {
  let destination = source;

  rangeMap.forEach((map) => {
    if (source < map.source) {
      return;
    }

    if (source > map.source + map.range - 1) {
      return;
    }

    destination = map.destination + (source - map.source);
  });

  return destination;
}

const rangeMapTest1 = [
  {
    destination: 50,
    source: 10,
    range: 20,
  },
];

assert(mapSourceToDestination(rangeMapTest1, 1) === 1);
assert(mapSourceToDestination(rangeMapTest1, 10) === 50);
assert(mapSourceToDestination(rangeMapTest1, 30) === 30);
assert(mapSourceToDestination(rangeMapTest1, 1000) === 1000);

const rangeMapTest2 = [
  {
    destination: 2567132380,
    source: 2400884472,
    range: 1279237224,
  },
];

assert(mapSourceToDestination(rangeMapTest2, 1) === 1);
assert(mapSourceToDestination(rangeMapTest2, 2400884472) === 2567132380);
assert(
  mapSourceToDestination(rangeMapTest2, 2400884472 + 50000) ===
    2567132380 + 50000
);

const rangeMapTest3 = [
  {
    destination: 50,
    source: 98,
    range: 2,
  },
];

assert(mapSourceToDestination(rangeMapTest3, 97) === 97);
assert(mapSourceToDestination(rangeMapTest3, 98) === 50);
assert(mapSourceToDestination(rangeMapTest3, 99) === 51);
assert(mapSourceToDestination(rangeMapTest3, 100) === 100);

const plantStructureTest1 = {
  seedToSoilMap: [
    {
      destination: 10,
      source: 1,
      range: 5,
    },
  ],
  soilToFertilizerMap: [
    {
      destination: 20,
      source: 10,
      range: 5,
    },
  ],
  fertilizerToWaterMap: [
    {
      destination: 30,
      source: 20,
      range: 5,
    },
  ],
  waterToLightMap: [
    {
      destination: 40,
      source: 30,
      range: 5,
    },
  ],
  lightToTemperatureMap: [
    {
      destination: 50,
      source: 40,
      range: 5,
    },
  ],
  temperatureToHumidityMap: [
    {
      destination: 60,
      source: 50,
      range: 5,
    },
  ],
  humidityToLocationMap: [
    {
      destination: 70,
      source: 60,
      range: 5,
    },
  ],
};

assert(getLocationForSeed(plantStructureTest1, 1) === 70);

const plantStructureTest2 = {
  seedToSoilMap: [
    {
      destination: 2400884472,
      source: 2567132380,
      range: 1279237224,
    },
  ],
  soilToFertilizerMap: [
    {
      destination: 20,
      source: 10,
      range: 5,
    },
  ],
  fertilizerToWaterMap: [
    {
      destination: 30,
      source: 20,
      range: 5,
    },
  ],
  waterToLightMap: [
    {
      destination: 40,
      source: 30,
      range: 5,
    },
  ],
  lightToTemperatureMap: [
    {
      destination: 50,
      source: 40,
      range: 5,
    },
  ],
  temperatureToHumidityMap: [
    {
      destination: 60,
      source: 50,
      range: 5,
    },
  ],
  humidityToLocationMap: [
    {
      destination: 70,
      source: 60,
      range: 5,
    },
  ],
};

assert(getLocationForSeed(plantStructureTest2, 1) === 1);
assert(
  getLocationForSeed(plantStructureTest2, 2567132380 + 31337) ===
    2400884472 + 31337
);

module.exports = getLocationForSeed;
