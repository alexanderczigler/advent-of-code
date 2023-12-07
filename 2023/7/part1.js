const assert = require("assert");

const testInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

function getHands(testInput) {
  return testInput.trim().split("\n").map(getHand);
}

assert(
  getHands(testInput).join(",") ===
    "32T3K,765,T55J5,684,KK677,28,KTJJT,220,QQQJA,483"
);

function getHand(line) {
  const [hand, bid] = line.split(" ");
  return [hand, parseInt(bid)];
}

assert(getHand("32T3K 765").join(",") === "32T3K,765");

function getWinnings(testInput) {
  return 0;
}

const answer = getWinnings(testInput);
console.log(`✨ Answer: ${answer}`);
assert(answer === 6440, "Wrong answer!");
