const fs = require("fs");
const readline = require("readline");

module.exports = {
  reader: (day) => {
    const input = `../input/${day}`;
    return readline.createInterface({
      input: fs.createReadStream(input),
      console: false,
    });
  },
};
