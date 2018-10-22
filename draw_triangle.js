let {generateTriangle} = require("./src/patternsLib.js");
const main = function() {
  const triangleType = process.argv[2];
  const height = +process.argv[3];
  const triangle = generateTriangle(triangleType, height);
  console.log(triangle);
};
main();
