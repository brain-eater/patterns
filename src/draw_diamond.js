let {generateDiamond} = require("./patternsLib.js");
const main = function() {
  const diamondType = process.argv[2];
  const height = +process.argv[3];
  const diamond = generateDiamond(diamondType, height);
  console.log(diamond);
};

main();
