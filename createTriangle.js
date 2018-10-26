let {getArguments} = require("./src/patternsUtil.js");
let {generateTriangle} = require("./src/patternsLib.js");
const main = function() {
  args = getArguments();
 const triangle = generateTriangle(args[0], args[1]);
  console.log(triangle);
};
main();
