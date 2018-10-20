const repeatCharacter = function(character, times) {
  let line = '';
  for (let count = 0; count < times; count++) {
    line = line + character;
  }
  return line;
};

const doWhatever = function(width,leftChar) {
  let leftBorderWidth = 1 % (width + 1);
  let rightBorderWidth = 1 % width;
  let left = repeatCharacter(leftChar, leftBorderWidth);
  let middle = repeatCharacter(middleChar, width - 2);
  let right = repeatCharacter(rightChar, rightBorderWidth);

  return 0;
}
const createLine = function(width, leftChar, middleChar, rightChar) {

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

const createTriangleOfType = function(triangleType, height) {
  if (triangleType == 'left') {
    return createLeftTriangle(height);
  }
  if (triangleType == 'right') {
    return createRightTriangle(height);
  }
  return '';
};

const main = function() {
  const triangleType = process.argv[2];
  const height = +process.argv[3];
  const triangle = createTriangleOfType(triangleType, height);
  console.log(triangle);
};

main();
