let {getArguments} = require("./src/patternsUtil.js");
let {classifyArgs,
  generateDiamond,
  generateTriangle,
  generateRectangle,
  generatePattern
} = require("./src/patternsLib.js");

const main = function(){
  let args = getArguments();
  let classifiedArgs = classifyArgs(args);
  console.log(classifiedArgs);
}
main();
