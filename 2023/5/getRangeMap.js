const assert = require("assert");

function getRangeMap(line) {
  const values = line.split(" ").map((value) => parseInt(value));
  const rangeMap = {
    destination: values[0],
    source: values[1],
    range: values[2],
  };

  return rangeMap;
}

const testMap1 = "2400884472 2567132380 1279237224";
const testMap2 = "0 459278395 111483239";
const testMap3 = "698481161 97868205 361410190";
const testMap4 = "1059891351 0 15994868";

assert(getRangeMap(testMap1).source === 2567132380);
assert(getRangeMap(testMap1).destination === 2400884472);
assert(getRangeMap(testMap1).range === 1279237224);

assert(getRangeMap(testMap2).source === 459278395);
assert(getRangeMap(testMap2).destination === 0);
assert(getRangeMap(testMap2).range === 111483239);

assert(getRangeMap(testMap3).source === 97868205);
assert(getRangeMap(testMap3).destination === 698481161);
assert(getRangeMap(testMap3).range === 361410190);

assert(getRangeMap(testMap4).source === 0);
assert(getRangeMap(testMap4).destination === 1059891351);
assert(getRangeMap(testMap4).range === 15994868);

module.exports = getRangeMap;
