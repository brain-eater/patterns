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
createAngledDiamond,
getValue,
flip,
mirror,
identity}
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

const classifyArgs = function(args){
  let shapes = {};
  let index = 0;
  let shapesList = {
    filled_rectangle : createFilledRectangle ,
    left_triangle : createLeftTriangle,
    right_triangle : createRightTriangle,
    hollow_rectangle : createHollowRectangle,
    alternating_rectangle : createAlternatingRectangle,
    filled_diamond : createFilledDiamond,
    hollow_diamond : createHollowDiamond,
    angled_diamond : createAngledDiamond
  }
  let modifiers = { 
    flip : { modifierFunc : flip, indexChange:1 },
    mirror : { modifierFunc : mirror , indexChange:1 },
    default:{ modifierFunc : identity , indexChange:0 }
  } 
  let modifier = getValue(modifiers,args[index]);
  let {modifierFunc} = modifier;
  index = index + modifier.indexChange;
  for(let shapeNo = 1;index < args.length;shapeNo++){
    shapeKey = "shape" + shapeNo;
    let shapeName = args[index];
    shapes[shapeKey] ={};
    if(shapeName.match(/rectangle/) != null){
      shapes[shapeKey].width =args[++index]
    }
    shapes[shapeKey].func = shapesList[shapeName];
    shapes[shapeKey].height = args[++index];
    index++;
  }
  return {shapes,modifierFunc};
}

exports.classifyArgs = classifyArgs;  


