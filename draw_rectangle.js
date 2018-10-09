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
const hollowLineGenerator = createLineGenerator('*', ' ', '*');

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

const createRectangleOfType = function(rectangleType, width, height) {
  if (rectangleType == 'filled') {
    return createFilledRectangle(width, height);
  }
  if (rectangleType == 'hollow') {
    return createHollowRectangle(width, height);
  }
  return '';
};

const main = function() {
  const rectangleType = process.argv[2];
  const width = +process.argv[3];
  const height = +process.argv[4];
  const rectangle = createRectangleOfType(rectangleType, width, height);
  console.log(rectangle);
};

main();
