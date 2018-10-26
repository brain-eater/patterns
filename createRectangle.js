let {getArguments} = require("./src/patternsUtil.js");
let {generateRectangle} = require("./src/patternsLib.js");
const main = function() {
  args = getArguments();
  const rectangle = generateRectangle(args[0], args[1], args[2]);
  console.log(rectangle);
};

main();
