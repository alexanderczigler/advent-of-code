const assert = require("assert");

function getSeedPairs(line) {
  const pairs = [];
  const seeds = line.split(": ")[1].split(" ");

  for (let i = 0; i < seeds.length; i += 2) {
    const from = parseInt(seeds[i]);
    const to = from + parseInt(seeds[i + 1]) - 1;

    pairs.push({
      from,
      to,
    });
  }

  return pairs;
}

const getSeedPairsTest = "seeds: 79 14 55 13";
assert(getSeedPairs(getSeedPairsTest).length === 2);
assert(getSeedPairs(getSeedPairsTest)[0].from === 79);
assert(getSeedPairs(getSeedPairsTest)[0].to === 92);
assert(getSeedPairs(getSeedPairsTest)[1].from === 55);
assert(getSeedPairs(getSeedPairsTest)[1].to === 67);

module.exports = getSeedPairs;
