const assert = require("assert");

const testInput = `
Time:      71530
Distance:  940200
`;

const input = `
Time:        48989083
Distance:   390110311121360
`;

function parseInput(input) {
  const lines = input.trim().split("\n");
  const [time, distance] = lines.map((line) =>
    line
      .split(/\s+/)
      .slice(1)
      .map((x) => parseInt(x))
  );
  return time.map((t, i) => ({ time: t, distance: distance[i] }));
}

const races = parseInput(input);

function getDistance(buttonTime, totalTime) {
  // Boat moves at 1 unit of distance per ms for each ms the button is held
  const speed = buttonTime;
  const distance = speed * (totalTime - buttonTime);

  return distance;
}

assert(getDistance(0, 7) === 0);
assert(getDistance(1, 7) === 6);
assert(getDistance(2, 7) === 10);
assert(getDistance(3, 7) === 12);
assert(getDistance(4, 7) === 12);
assert(getDistance(5, 7) === 10);
assert(getDistance(6, 7) === 6);
assert(getDistance(7, 7) === 0);

function getRecordBeatingTimes(race) {
  const timesThatBeatRecord = [];

  for (let i = 0; i <= race.time; i++) {
    const distance = getDistance(i, race.time);

    if (distance > race.distance) {
      timesThatBeatRecord.push(i);
    }
    // console.log(`🔋 ${i} ms: ${distance} mm`);
  }

  return timesThatBeatRecord;
}

assert(
  getRecordBeatingTimes({
    time: 7,
    distance: 9,
  })[0] === 2
);
assert(
  getRecordBeatingTimes({
    time: 7,
    distance: 9,
  })[1] === 3
);
assert(
  getRecordBeatingTimes({
    time: 7,
    distance: 9,
  })[2] === 4
);
assert(
  getRecordBeatingTimes({
    time: 7,
    distance: 9,
  })[3] === 5
);

let result = 1;
races.forEach((race) => {
  result *= getRecordBeatingTimes(race).length;
});

console.log(`✨ Part 2: ${result}`);
assert(result === 28973936);
