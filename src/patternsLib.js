let lib = require("./patternsUtil.js");
let {repeatCharacter} = lib;
let {createLine} = lib;
let {joinLines} = lib;
let {createLineGenerator} = lib;
let {filledLineGenerator} = lib;
let {dashedLineGenerator} = lib;
let {hollowLineGenerator} = lib;
let {createRectangle} = lib;
let {createFilledRectangle} = lib;
let {createHollowRectangle} = lib;
let {createAlternatingRectangle} = lib;
let {rightJustifyLine} = lib;
let {centerJustifyLine} = lib;
let {leftJustifyLine} = lib;
let {createTriangle} = lib;
let {createLeftTriangle} = lib;
let {createRightTriangle} = lib;
let {topHalfGenerator} = lib;
let {bottomHalfGenerator} = lib;
let {assembleDiamond} = lib;
let {generateJustifiedLine} = lib;
let {createDiamond} = lib;
let {createFilledDiamond} = lib;
let {createHollowDiamond} = lib;
let {createAngledDiamond} = lib;

const generateRectangle = function(rectangleType, width, height) {
  if (rectangleType == 'filled') {
    return createFilledRectangle(width, height);
  }
  if (rectangleType == 'hollow') {
    return createHollowRectangle(width, height);
  }
  if (rectangleType == 'alternating') {
    return createAlternatingRectangle(width, height);
  }
  return '';
};


exports.generateRectangle = generateRectangle;

//code for drawing triangle
const generateTriangle = function(triangleType, height) {
  if (triangleType == 'left') {
    return createLeftTriangle(height);
  }
  if (triangleType == 'right') {
    return createRightTriangle(height);
  }
  return '';
};


exports.generateTriangle = generateTriangle;

//function for drawDiamonds
const generateDiamond = function(diamondType, height) {
  if (diamondType == 'filled') {
    return createFilledDiamond(height);
  }
  if (diamondType == 'hollow') {
    return createHollowDiamond(height);
  }
  if (diamondType == 'angled') {
    return createAngledDiamond(height);
  }
  return '';
};

exports.generateDiamond = generateDiamond;

//main for lib
const main = function(){
  shape = process.argv[2];
  type = process.argv[3];
  height = process.argv[4];
  width = process.argv[5];
  if(shape == "triangle"){
    console.log(generateTriangle(type,height));
  }else if(shape == "rectangle"){
    console.log(generateRectangle(type,height,width));
  }else{
    console.log(generateDiamond(type,height));
  }
}
