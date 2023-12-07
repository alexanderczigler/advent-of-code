const assert = require("assert");
const fs = require("fs");

const testInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

const input = fs.readFileSync("../input/7", "utf8");
console.log(input);
function handIsFiveOfAKind(hand) {
  return new Set(hand.split("")).size === 1;
}

assert(handIsFiveOfAKind("32T3K") === false);
assert(handIsFiveOfAKind("AAAAA") === true);

function handIsFourOfAKind(hand) {
  const counts = {};
  for (const card of hand) {
    counts[card] = (counts[card] || 0) + 1;
  }
  return Object.values(counts).includes(4);
}

assert(handIsFourOfAKind("32T3K") === false);
assert(handIsFourOfAKind("AAAAA") === false);
assert(handIsFourOfAKind("AA8AA") === true);
assert(handIsFourOfAKind("23332") === false);

function handIsThreeOfAKind(hand) {
  const counts = {};
  for (const card of hand) {
    counts[card] = (counts[card] || 0) + 1;
  }

  let threeOfAKindFound = false;
  for (const count of Object.values(counts)) {
    if (count === 3) {
      if (threeOfAKindFound) {
        // If we find another set of three, it's not a valid three of a kind
        return false;
      }
      threeOfAKindFound = true;
    } else if (count > 3) {
      // More than three of a kind is not valid
      return false;
    }
  }

  return threeOfAKindFound;
}

assert(handIsThreeOfAKind("32T3K") === false);
assert(handIsThreeOfAKind("AAAAA") === false);
assert(handIsThreeOfAKind("AA8AA") === false);
assert(handIsThreeOfAKind("23332") === true);

function handIsFullHouse(hand) {
  const counts = {};
  for (let card of hand) {
    counts[card] = (counts[card] || 0) + 1;
  }

  let hasThreeOfAKind = false;
  let hasPair = false;
  for (let count of Object.values(counts)) {
    if (count === 3) {
      hasThreeOfAKind = true;
    } else if (count === 2) {
      hasPair = true;
    }
  }

  return hasThreeOfAKind && hasPair;
}

assert(handIsFullHouse("32T3K") === false);
assert(handIsFullHouse("AA8AA") === false);
assert(handIsFullHouse("23332") === true);

function handIsTwoPair(hand) {
  const counts = {};
  for (let card of hand) {
    counts[card] = (counts[card] || 0) + 1;
  }

  let pairCount = 0;
  for (let count of Object.values(counts)) {
    if (count === 2) {
      pairCount++;
    } else if (count > 2) {
      // If any card appears more than twice, it's not a valid two pair hand
      return false;
    }
  }

  return pairCount === 2;
}

assert(handIsTwoPair("32T3K") === false);
assert(handIsTwoPair("AAAAA") === false);
assert(handIsTwoPair("AA8AA") === false);
assert(handIsTwoPair("23332") === false);
assert(handIsTwoPair("KTJJT") === true);

function handIsOnePair(hand) {
  const counts = {};
  for (let card of hand) {
    counts[card] = (counts[card] || 0) + 1;
  }

  let pairFound = false;
  for (let count of Object.values(counts)) {
    if (count === 2) {
      if (pairFound) {
        // If a second pair is found, it's not a valid one pair hand
        return false;
      }
      pairFound = true;
    } else if (count > 2) {
      // More than two of a kind is not valid for a one pair hand
      return false;
    }
  }

  return pairFound;
}

assert(handIsOnePair("32T3K") === true);
assert(handIsOnePair("AAAAA") === false);
assert(handIsOnePair("AA8AA") === false);
assert(handIsOnePair("23332") === false);
assert(handIsOnePair("KTJJT") === false);
assert(handIsOnePair("KK678") === true);

function getCardValue(card) {
  if (card === "A") {
    return 14;
  }
  if (card === "K") {
    return 13;
  }
  if (card === "Q") {
    return 12;
  }
  if (card === "J") {
    return 11;
  }
  if (card === "T") {
    return 10;
  }
  return parseInt(card);
}

assert(getCardValue("A") === 14);
assert(getCardValue("K") === 13);
assert(getCardValue("Q") === 12);
assert(getCardValue("J") === 11);
assert(getCardValue("T") === 10);
assert(getCardValue("9") === 9);
assert(getCardValue("8") === 8);
assert(getCardValue("7") === 7);
assert(getCardValue("6") === 6);
assert(getCardValue("5") === 5);
assert(getCardValue("4") === 4);
assert(getCardValue("3") === 3);
assert(getCardValue("2") === 2);

function compareCards(card1, card2) {
  const value1 = getCardValue(card1);
  const value2 = getCardValue(card2);
  if (value1 > value2) {
    return 1;
  }
  if (value1 < value2) {
    return -1;
  }
  return 0;
}

assert(compareCards("A", "K") === 1);
assert(compareCards("K", "Q") === 1);
assert(compareCards("Q", "J") === 1);
assert(compareCards("J", "T") === 1);
assert(compareCards("T", "9") === 1);
assert(compareCards("9", "8") === 1);
assert(compareCards("8", "7") === 1);
assert(compareCards("7", "6") === 1);
assert(compareCards("6", "5") === 1);
assert(compareCards("5", "4") === 1);
assert(compareCards("4", "3") === 1);
assert(compareCards("3", "2") === 1);

function compareHands(hand1, hand2) {
  console.log(`Comparing ${hand1} to ${hand2}`);
  if (handIsFiveOfAKind(hand1)) {
    if (!handIsFiveOfAKind(hand2)) {
      return 1;
    }
  } else if (handIsFiveOfAKind(hand2)) {
    return -1;
  }

  if (handIsFourOfAKind(hand1)) {
    if (!handIsFourOfAKind(hand2)) {
      return 1;
    }
  } else if (handIsFourOfAKind(hand2)) {
    return -1;
  }

  if (handIsFullHouse(hand1)) {
    if (!handIsFullHouse(hand2)) {
      return 1;
    }
  } else if (handIsFullHouse(hand2)) {
    return -1;
  }

  if (handIsThreeOfAKind(hand1)) {
    console.log(`hand 1 is three of a kind`);
    if (!handIsThreeOfAKind(hand2)) {
      console.log(`hand 2 is not three of a kind`);
      return 1;
    }
  } else if (handIsThreeOfAKind(hand2)) {
    return -1;
  }

  if (handIsTwoPair(hand1)) {
    if (!handIsTwoPair(hand2)) {
      return 1;
    }
  } else if (handIsTwoPair(hand2)) {
    return -1;
  }

  // TODO: Check for one pair
  if (handIsOnePair(hand1)) {
    if (!handIsOnePair(hand2)) {
      return 1;
    }
  } else if (handIsOnePair(hand2)) {
    return -1;
  }

  // TODO: Check card by card.
  const hand1Cards = hand1.split("");
  const hand2Cards = hand2.split("");
  const hand1CardValues = hand1Cards.map(getCardValue);
  const hand2CardValues = hand2Cards.map(getCardValue);

  for (let i = 0; i < hand1CardValues.length; i++) {
    const hand1CardValue = hand1CardValues[i];
    const hand2CardValue = hand2CardValues[i];
    if (hand1CardValue > hand2CardValue) {
      return 1;
    }
    if (hand1CardValue < hand2CardValue) {
      return -1;
    }
  }

  return 0;
}

assert(compareHands("32T3K", "32T3K") === 0);
assert(compareHands("32T3K", "T55J5") === -1);
assert(compareHands("32T3K", "KK677") === -1);
assert(compareHands("32T3K", "KTJJT") === -1);
assert(compareHands("32T3K", "QQQJA") === -1);

assert(compareHands("T55J5", "32T3K") === 1);
assert(compareHands("T55J5", "T55J5") === 0);
assert(compareHands("T55J5", "KK677") === 1);
assert(compareHands("T55J5", "KTJJT") === 1);
assert(compareHands("T55J5", "QQQJA") === -1);

assert(compareHands("KK677", "32T3K") === 1);
assert(compareHands("KK677", "T55J5") === -1);
assert(compareHands("KK677", "KK677") === 0);
assert(compareHands("KK677", "KTJJT") === 1);
assert(compareHands("KK677", "QQQJA") === -1);

assert(compareHands("KTJJT", "32T3K") === 1);
assert(compareHands("KTJJT", "T55J5") === -1);
assert(compareHands("KTJJT", "KK677") === -1);
assert(compareHands("KTJJT", "KTJJT") === 0);
assert(compareHands("KTJJT", "QQQJA") === -1);

assert(compareHands("QQQJA", "32T3K") === 1);
assert(compareHands("QQQJA", "T55J5") === 1);
assert(compareHands("QQQJA", "KK677") === 1);
assert(compareHands("QQQJA", "KTJJT") === 1);
assert(compareHands("QQQJA", "QQQJA") === 0);

function getHands(input) {
  return input.trim().split("\n").map(getHand);
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

function getWinnings(input) {
  const hands = getHands(input);
  const handsMap = {};
  for (const [hand, bid] of hands) {
    handsMap[hand] = bid;
  }
  const unsortedHands = Object.keys(handsMap);
  const sortedHands = unsortedHands.sort(compareHands);
  console.log("sorted", sortedHands);

  let winnings = 0;
  sortedHands.forEach((hand, index) => {
    console.log(`Hand ${hand} (${handsMap[hand]}) | Rank ${index + 1}`);
    winnings += handsMap[hand] * (index + 1);
  });

  return winnings;
}

const answer = getWinnings(input);
console.log(`✨ Answer: ${answer}`);
assert(answer === 247823654, "Wrong answer!");
