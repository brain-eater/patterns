let lib = require("./patternsUtil.js");
let {repeatCharacter,
createLine,
joinLines,
createLineGenerator,
filledLineGenerator,
dashedLineGenerator,
hollowLineGenerator,
createRectangle,
createFilledRectangle,
createHollowRectangle,
createAlternatingRectangle,
rightJustifyLine,
centerJustifyLine,
leftJustifyLine,
createTriangle,
createLeftTriangle,
createRightTriangle,
topHalfGenerator,
bottomHalfGenerator,
assembleDiamond,
generateJustifiedLine,
createDiamond,
createFilledDiamond,
createHollowDiamond,
createAngledDiamond}
 = lib;

const generateRectangle = function(rectangleType, width, height) {
  let rectangleFunctions = {
    filled : createFilledRectangle,
    hollow : createHollowRectangle,
    alternating: createAlternatingRectangle
  }; 
  let createRectangle =  rectangleFunctions[rectangleType];
  return createRectangle(width,height);
 };


exports.generateRectangle = generateRectangle;

//code for drawing triangle
const generateTriangle = function(triangleType, height) {
  let triangleFunctions = {
    left : createLeftTriangle,
    right : createRightTriangle,
  }
  let createTriangle = triangleFunctions[triangleType];
  return createTriangle(height);
};


exports.generateTriangle = generateTriangle;

//function for drawDiamonds
const generateDiamond = function(diamondType, height) {
  let diamondFunctions = {
    filled : createFilledDiamond,
    hollow : createHollowDiamond,
    angled: createAngledDiamond
  }; 
  let createDiamond =  diamondFunctions[diamondType];
  return createDiamond(height);
 
};

exports.generateDiamond = generateDiamond;

