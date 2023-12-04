const { assert } = require("console");

function getCard(card) {
  const cardNumber = card.split(":")[0].split(" ")[1];

  return {
    card: parseInt(cardNumber),
    numbers: getCardNumbers(card),
    winningNumbers: getWinningNumbers(card),
  };
}

function getCardNumbers(card) {
  const numbers = [];

  card
    .split(":")[1]
    .split("|")[0]
    .replace("  ", " ")
    .split(" ")
    .map((number) => {
      if (number) {
        numbers.push(parseInt(number));
      }
    });

  return numbers;
}

function getWinningNumbers(card) {
  const numbers = [];

  card
    .split(":")[1]
    .split("|")[1]
    .replace("  ", " ")
    .split(" ")
    .map((number) => {
      if (number) {
        numbers.push(parseInt(number));
      }
    });

  return numbers;
}

module.exports = getCard;

const cards = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
];

const card1 = getCard(cards[0]);
const card3 = getCard(cards[2]);

assert(card1.card === 1);
assert(card1.numbers.length === 5);
assert(card1.numbers[0] === 41);
assert(card1.winningNumbers.length === 8);

assert(card3.card === 3);
assert(card3.numbers.length === 5);
assert(card3.numbers[0] === 1);
assert(card3.winningNumbers.length === 8);
