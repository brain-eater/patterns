const repeatCharacter = function(character, times) {
  let line = '';
  for (let count = 0; count < times; count++) {
    line = line + character;
  }
  return line;
};

exports.repeatCharacter = repeatCharacter;

const createLine = function(width, leftChar, middleChar, rightChar) {
  let leftBorderWidth = 1 % (width + 1);
  let rightBorderWidth = 1 % width;
  let left = repeatCharacter(leftChar, leftBorderWidth);
  let middle = repeatCharacter(middleChar, width - 2);
  let right = repeatCharacter(rightChar, rightBorderWidth);
  return left + middle + right;
};

exports.createLine = createLine;

const joinLines = function(previous, lineToJoin, lineSeparator) {
  if(lineToJoin == ""){
    return previous;
  }
  return previous + lineSeparator + lineToJoin;
};

exports.joinLines = joinLines;

const createLineGenerator = function(leftChar, middleChar, rightChar) {
  let lineGenerator = function(width) {
    return createLine(width, leftChar, middleChar, rightChar);
  };

  return lineGenerator;
};

exports.createLineGenerator = createLineGenerator;

const filledLineGenerator = createLineGenerator('*', '*', '*');

exports.filledLineGenerator = filledLineGenerator;

const dashedLineGenerator = createLineGenerator('-', '-', '-');

exports.dashedLineGenerator = dashedLineGenerator;

const hollowLineGenerator = createLineGenerator('*', ' ', '*');

exports.hollowLineGenerator = hollowLineGenerator;

//functions for drawing rectangle
const createRectangle = function(
  width,
  height,
  topLineGenerator,
  middleLineGenerator,
  bottomLineGenerator,
) {
  let lineSeparator = '\n';
  if (height < 1) {
    return "";
  }
  let rectangle = topLineGenerator(width);
  for (let row = 0; row < height - 2; row++) {
    let middleLine = middleLineGenerator(width);
    rectangle = joinLines(rectangle, middleLine, lineSeparator);
  }
  if(height < 2) {
    return rectangle;
  }
  let bottomLine = bottomLineGenerator(width);
  return joinLines(rectangle, bottomLine, lineSeparator);
};

exports.createRectangle = createRectangle;

const createFilledRectangle = function(width, height) {
  return createRectangle(
    width,
    height,
    filledLineGenerator,
    filledLineGenerator,
    filledLineGenerator,
  );
};

exports.createFilledRectangle = createFilledRectangle;

const createHollowRectangle = function(width, height) {
  return createRectangle(
    width,
    height,
    filledLineGenerator,
    hollowLineGenerator,
    filledLineGenerator,
  );
};

exports.createHollowRectangle = createHollowRectangle;

const createAlternatingRectangle = function(width,height) {
  let lineSeparator = '';
  let rectangle ='';
  let generators = [ filledLineGenerator, dashedLineGenerator ];
  if (height < 1) {
    return "";
  }
  for (let row = 0; row < height; row++) {
    let generator = generators[row%2];
    let line = generator(width);
    rectangle = joinLines(rectangle, line, lineSeparator);
    lineSeparator = '\n';
  }
  return rectangle;
}

exports.createAlternatingRectangle = createAlternatingRectangle;

//functions for creating triangle
const rightJustifyLine = function(text, width) {
  let numberOfSpaces = width - text.length;
  let spaces = repeatCharacter(' ', numberOfSpaces);
  return spaces + text;
};

exports.rightJustifyLine = rightJustifyLine;

const centerJustifyLine = function(text, width) {
  let numberOfSpaces = (width - text.length) / 2;
  let spaces = repeatCharacter(' ', numberOfSpaces);
  return spaces + text + spaces;
};

exports.centerJustifyLine = centerJustifyLine;

const leftJustifyLine = function(text, width) {

  return text;
};

exports.leftJustifyLine = leftJustifyLine;

const createTriangle = function(height, justifier) {
  let triangle = '';
  let lineSeparator = '';
  for (let row = 1; row <= height; row++) {
    let line = filledLineGenerator(row);
    let justifiedLine = justifier(line, height);
    triangle = joinLines(triangle, justifiedLine, lineSeparator);
    lineSeparator = '\n';
  }
  return triangle;
};

exports.createTriangle = createTriangle;

const createLeftTriangle = function(height) {
  return createTriangle(height, leftJustifyLine);
};

exports.createLeftTriangle = createLeftTriangle;

const createRightTriangle = function(height) {
  return createTriangle(height, rightJustifyLine);
};

exports.createRightTriangle = createRightTriangle;

//function for drawDiamonds
const topHalfGenerator = createLineGenerator('/', ' ', '\\');

exports.topHalfGenerator = topHalfGenerator;

const bottomHalfGenerator = createLineGenerator('\\', ' ', '/');

exports.bottomHalfGenerator = bottomHalfGenerator;

const assembleDiamond = function(tip, topHalf, middle, bottomHalf) {
  let diamond = tip;
  let lineSeparator = '\n';
  diamond = joinLines(diamond, topHalf, lineSeparator);
  diamond = joinLines(diamond, middle, lineSeparator);
  diamond = joinLines(diamond, bottomHalf, lineSeparator);
  diamond = joinLines(diamond, tip, lineSeparator);
  return diamond;
};

exports.assembleDiamond = assembleDiamond;

const generateJustifiedLine = function(lineGenerator, width, justifyWidth) {
  let line = lineGenerator(width);
  return centerJustifyLine(line, justifyWidth);
};

exports.generateJustifiedLine = generateJustifiedLine;

const createDiamond = function(
  height,
  tipGenerator,
  topGenerator,
  middleGenerator,
  bottomGenerator,
) {
  let lineSeparator = '';
  let topHalf = '';
  let bottomHalf = '';
  let justifiedTip = generateJustifiedLine(tipGenerator, 1, height);

  if(height == 1 ){
  return "*";
  }

  for (let row = 3; row < height; row += 2) {
    let justifiedTop = generateJustifiedLine(topGenerator, row, height);
    let justifiedBottom = generateJustifiedLine(bottomGenerator, row, height);

    topHalf = joinLines(topHalf, justifiedTop, lineSeparator);
    bottomHalf = joinLines(justifiedBottom, bottomHalf, lineSeparator);
    lineSeparator = '\n';
  }
  let middle = generateJustifiedLine(middleGenerator, height, height);
  return assembleDiamond(justifiedTip, topHalf, middle, bottomHalf);
};

exports.createDiamond = createDiamond;

const createFilledDiamond = function(height) {
  return createDiamond(
    height,
    filledLineGenerator,
    filledLineGenerator,
    filledLineGenerator,
    filledLineGenerator,
  );
};

exports.createFilledDiamond = createFilledDiamond;

const createHollowDiamond = function(height) {
  return createDiamond(
    height,
    hollowLineGenerator,
    hollowLineGenerator,
    hollowLineGenerator,
    hollowLineGenerator,
  );
};

exports.createHollowDiamond =createHollowDiamond;

const createAngledDiamond = function(height) {
  return createDiamond(
    height,
    filledLineGenerator,
    topHalfGenerator,
    hollowLineGenerator,
    bottomHalfGenerator,
  );
};

exports.createAngledDiamond = createAngledDiamond;

const getArguments = function(){
  return process.argv.slice(2);
}

exports.getArguments = getArguments;

const getValue = function(object,key){
  if(object[key] == undefined){
    return object.default;
  }
  return object[key];
}

exports.getValue = getValue;

const flip = undefined;

exports.flip = flip;

const mirror = undefined;

exports.mirror = mirror;
