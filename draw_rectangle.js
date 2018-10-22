let {generateRectangle} = require("./src/patternsLib.js");
const main = function() {
  const rectangleType = process.argv[2];
  const width = +process.argv[3];
  const height = +process.argv[4];
  const rectangle = generateRectangle(rectangleType, width, height);
  console.log(rectangle);
};

main();
