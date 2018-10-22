const repeatCharacter = function(character, times) {
  let line = '';
  for (let count = 0; count < times; count++) {
    line = line + character;
  }
  return line;
};

const createLine = function(width, leftChar, middleChar, rightChar) {
  let leftBorderWidth = 1 % (width + 1);
  let rightBorderWidth = 1 % width;
  let left = repeatCharacter(leftChar, leftBorderWidth);
  let middle = repeatCharacter(middleChar, width - 2);
  let right = repeatCharacter(rightChar, rightBorderWidth);
  return left + middle + right;
};

const joinLines = function(previous, lineToJoin, lineSeparator) {
  return previous + lineSeparator + lineToJoin;
};

const createLineGenerator = function(leftChar, middleChar, rightChar) {
  let lineGenerator = function(width) {
    return createLine(width, leftChar, middleChar, rightChar);
  };

  return lineGenerator;
};

const filledLineGenerator = createLineGenerator('*', '*', '*');
const dashedLineGenerator = createLineGenerator('-', '-', '-');
const hollowLineGenerator = createLineGenerator('*', ' ', '*');


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

const createFilledRectangle = function(width, height) {
  return createRectangle(
    width,
    height,
    filledLineGenerator,
    filledLineGenerator,
    filledLineGenerator,
  );
};

const createHollowRectangle = function(width, height) {
  return createRectangle(
    width,
    height,
    filledLineGenerator,
    hollowLineGenerator,
    filledLineGenerator,
  );
};

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
const rightJustifyLine = function(text, width) {
  let numberOfSpaces = width - text.length;
  let spaces = repeatCharacter(' ', numberOfSpaces);
  return spaces + text;
};

const centerJustifyLine = function(text, width) {
  let numberOfSpaces = (width - text.length) / 2;
  let spaces = repeatCharacter(' ', numberOfSpaces);
  return spaces + text + spaces;
};

const leftJustifyLine = function(text, width) {

  return text;
};

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

const createLeftTriangle = function(height) {
  return createTriangle(height, leftJustifyLine);
};

const createRightTriangle = function(height) {
  return createTriangle(height, rightJustifyLine);
};

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
const topHalfGenerator = createLineGenerator('/', ' ', '\\');
const bottomHalfGenerator = createLineGenerator('\\', ' ', '/');

const assembleDiamond = function(tip, topHalf, middle, bottomHalf) {
  let diamond = tip;
  let lineSeparator = '\n';
  diamond = joinLines(diamond, topHalf, lineSeparator);
  diamond = joinLines(diamond, middle, lineSeparator);
  diamond = joinLines(diamond, bottomHalf, lineSeparator);
  diamond = joinLines(diamond, tip, lineSeparator);
  return diamond;
};

const generateJustifiedLine = function(lineGenerator, width, justifyWidth) {
  let line = lineGenerator(width);
  return centerJustifyLine(line, justifyWidth);
};

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

const createFilledDiamond = function(height) {
  return createDiamond(
    height,
    filledLineGenerator,
    filledLineGenerator,
    filledLineGenerator,
    filledLineGenerator,
  );
};

const createHollowDiamond = function(height) {
  return createDiamond(
    height,
    hollowLineGenerator,
    hollowLineGenerator,
    hollowLineGenerator,
    hollowLineGenerator,
  );
};

const createAngledDiamond = function(height) {
  return createDiamond(
    height,
    filledLineGenerator,
    topHalfGenerator,
    hollowLineGenerator,
    bottomHalfGenerator,
  );
};

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
    console.log(drawTriangle(type,height));
  }else if(shape == "rectangle"){
    console.log(drawRectangle(type,height,width));
  }else{
    console.log(drawDiamond(type,height));
  }
}

