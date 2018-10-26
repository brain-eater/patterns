let {getArguments} = require("./src/patternsUtil.js");
let {generateDiamond} = require("./src/patternsLib.js");
const main = function() {
 args =  getArguments();
 let  diamond = generateDiamond(args[0], args[1]);
  console.log(diamond);
};

main();
