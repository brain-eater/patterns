const assert = require("assert");
const lib = require("../src/patternsUtil.js");

//test repeatCharacter()
let {repeatCharacter} = lib;
assert.deepEqual(repeatCharacter("!",0),"");
assert.deepEqual(repeatCharacter("!",2),"!!");
assert.deepEqual(repeatCharacter("*",5),"*****");

//to test createLine()
let {createLine} = lib;
assert.deepEqual(createLine(0,"*","*","*"),"");
assert.deepEqual(createLine(5,"*","*","*"),"*****");
assert.deepEqual(createLine(5,"@","*","@"),"@***@");

//to test joinLines()
let {joinLines} = lib;
assert.deepEqual(joinLines("","",""),"");
assert.deepEqual(joinLines("Ti","lak",""),"Tilak");
assert.deepEqual(joinLines("Hi","Tech","-"),"Hi-Tech");

//to test LineGenerators
let {createLineGenerator} = lib;
//these 3 generators are return functions of createLineGenerator
let {filledLineGenerator} = lib;
assert.deepEqual(filledLineGenerator(0),"");
assert.deepEqual(filledLineGenerator(3),"***");

let {dashedLineGenerator} = lib;
assert.deepEqual(dashedLineGenerator(0),"");
assert.deepEqual(dashedLineGenerator(3),"---");

let {hollowLineGenerator} = lib;
assert.deepEqual(hollowLineGenerator(0),"");
assert.deepEqual(hollowLineGenerator(3),"* *");

//to test createRectangle
let {createRectangle} = lib;
assert.deepEqual(createRectangle(1,2,filledLineGenerator,filledLineGenerator,filledLineGenerator),"*\n*");
assert.deepEqual(createRectangle(4,3,dashedLineGenerator,filledLineGenerator,dashedLineGenerator),'----\n****\n----');

//to test createFilledRectangle
let {createFilledRectangle} = lib;
assert.deepEqual(createFilledRectangle(2,3),'**\n**\n**');
assert.deepEqual(createFilledRectangle(1,1),'*');

//to test createHollowRectangle
let {createHollowRectangle} = lib;
assert.deepEqual(createHollowRectangle(5,3),'*****\n*   *\n*****');
assert.deepEqual(createHollowRectangle(3,3),'***\n* *\n***');

//to test createAlternatingRectangle
let {createAlternatingRectangle} = lib;
assert.deepEqual(createAlternatingRectangle(3,3),'***\n---\n***');

//to test rightJustifyLine
let {rightJustifyLine} = lib;
assert.deepEqual(rightJustifyLine("Tilak",8),'   Tilak');

//to test centerJustifyLine
let {centerJustifyLine} = lib;
assert.deepEqual(centerJustifyLine("Tilak",10),'   Tilak   ');

//to test leftJustifyLine
let {leftJustifyLine} = lib;
assert.deepEqual(leftJustifyLine("Tilak",8),'Tilak');

//to test createLeftTriangle
let {createLeftTriangle} = lib;
assert.deepEqual(createLeftTriangle(3),'*\n**\n***');

//to test createRightTriangle
let {createRightTriangle} = lib;
assert.deepEqual(createRightTriangle(3),'  *\n **\n***');

//these two functions are just createLineGenerator
let {topHalfGenerator} = lib;
let {bottomHalfGenerator} = lib;

//to test assembleDiamond
let {assembleDiamond} = lib;
assert.deepEqual(assembleDiamond("*","_","_","_"),'*\n_\n_\n_\n*');

//to test generateJustifiedLine
let {generateJustifiedLine} = lib;
assert.deepEqual(generateJustifiedLine(filledLineGenerator,4,10),'   ****   ');

//to test createDiamond
let {createDiamond} = lib;
assert.deepEqual(createDiamond(5,filledLineGenerator,filledLineGenerator,filledLineGenerator,filledLineGenerator),'  *  \n *** \n*****\n *** \n  *  ');

//to test createFilledDiamond
let {createFilledDiamond} = lib;
assert.deepEqual(createFilledDiamond(5),'  *  \n *** \n*****\n *** \n  *  ');

//to test createHollowDiamond
let {createHollowDiamond} = lib;
assert.deepEqual(createHollowDiamond(3),' * \n* *\n * ');

//to test createAngledDiamond
let {createAngledDiamond} = lib;
assert.deepEqual(createAngledDiamond(5),'  *  \n / \\ \n*   *\n \\ / \n  *  ');


console.log("Tested PatternsUtil.js");
