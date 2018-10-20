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
const topHalfGenerator = createLineGenerator('/', ' ', '\\');
const bottomHalfGenerator = createLineGenerator('\\', ' ', '/');

const centerJustifyLine = function(text, width) {
  let numberOfSpaces = (width - text.length) / 2;
  let spaces = repeatCharacter(' ', numberOfSpaces);
  return spaces + text + spaces;
};

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

const createDiamondOfType = function(diamondType, height) {
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

const main = function() {
  const diamondType = process.argv[2];
  const height = +process.argv[3];
  const diamond = createDiamondOfType(diamondType, height);
  console.log(diamond);
};

main();
