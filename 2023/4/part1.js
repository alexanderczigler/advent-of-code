const assert = require("assert");
const getCard = require("../utils/getCard");
const input = require("../input");
const readInterface = input.reader(4);

let points = 0;
readInterface.on("line", function (line) {
  const card = getCard(line);
  let cardPointss = 0;

  card.numbers.forEach((number) => {
    if (card.winningNumbers.includes(number)) {
      if (cardPointss === 0) {
        cardPointss = 1;
      } else {
        cardPointss *= 2;
      }
    }
  });

  points += cardPointss;
});

readInterface.on("close", () => {
  assert(points === 24848);

  console.log(`✨ Points: ${points}`);
});
