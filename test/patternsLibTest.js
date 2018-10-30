let assert = require("assert");
let lib = require("../src/patternsLib.js");
let {generateTriangle} = lib;
let {generateDiamond} = lib;
let {generateRectangle} = lib;

//test generateRectangle
assert.deepEqual(generateTriangle("left",5),'*    \n**   \n***  \n**** \n*****');
assert.deepEqual(generateTriangle("right",5),"    *\n   **\n  ***\n ****\n*****");

//test generateDiamond
assert.deepEqual(generateDiamond("filled",5),"  *  \n *** \n*****\n *** \n  *  ");
assert.deepEqual(generateDiamond("hollow",5),'  *  \n * * \n*   *\n * * \n  *  ');
assert.deepEqual(generateDiamond("angled",5),'  *  \n / \\ \n*   *\n \\ / \n  *  ');

//test generateRectangle
assert.deepEqual(generateRectangle("filled",5,5),"*****\n*****\n*****\n*****\n*****");
assert.deepEqual(generateRectangle("hollow",5,5),'*****\n*   *\n*   *\n*   *\n*****');
assert.deepEqual(generateRectangle("alternating",5,5),'*****\n-----\n*****\n-----\n*****');

console.log("Tested patternsLib.js");
