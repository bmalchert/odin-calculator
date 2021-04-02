// Some constants
const   ADD   =   'add';
const   SUB   =   'subtract';
const   MUL   =   'multiply';
const   DIV   =   'divide';
const   EQ    =   'equal';
const   OPERR =   'invalid operator';

// *************************
// Calculator memory object
// *************************
const memory = {
  x: 0,
  y: 0,
  lastOperator: EQ,
  newDigitFlag: true,

  addDigit: function(n) {
    if (this.newDigitFlag) {
      this.y = this.x;
      this.x = 0;
      this.newDigitFlag = false;
    }
    
    this.x = Number(String(this.x) + String(n));
    display.populate(this.x);
  },

  operate: function(op) {
    
    if (this.lastOperator !== EQ) {
      this.x = operate(this.x, this.y, this.lastOperator);
      display.populate(this.x);
    }

    this.newDigitFlag = true;
    this.lastOperator = op;
  },

  clear: function() {
    this.x = 0;
    this.y = 0;
    this.lastOperator = EQ;
    this.newDigitFlag = true;
    display.clear();
  }
}

// Bind the `this` for the memory object
memory.clear = memory.clear.bind(memory)

// *****************************
// DOM constants
// *****************************
const calculator = document.querySelector('#calculator');

// ******************************
// Basic math functions
// ******************************

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return y - x;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return y / x;
}

// ******************************
// Operation function
//
// Accepts two operands and an operator and calls the appropriate math function
// ******************************

function operate(x, y, op) {
  let value;

  switch (op) {
    case ADD:
      value = add(x, y);
      break;

    case SUB:
      value = subtract(x, y);
      break;

    case MUL:
      value = multiply(x, y);
      break;

    case DIV:
      value = divide(x, y);
      break;

    default:
      value = OPERR;
      break;
  }

  return value;
}

// ******************************
// Display object
// ******************************

const display = {
  dom: document.querySelector('#display'),

  // Clear the display
  clear: function() {
    this.populate("0");
  },

  // Populate the display with content
  populate: function(content) {
    this.dom.textContent = content;
  },
}

// ****************************************
// Class for a button that represents a number
// ****************************************
class numberButton {
  constructor(number) {
    this.number = number;

    // we want `this` to always refer to the class instance. We need to do this
    // because `pushButton` will be an event handler
    this.pushButton = this.pushButton.bind(this);
  }
  
  pushButton() {
    console.log(this.number);
    memory.addDigit(this.number); 
  }
}

// ****************************************
// Class for a button that represents an operator
// ****************************************
class operatorButton {
  constructor(operator) {
    this.operator = operator;

    // bind `this` as in numberButton class
    this.pushButton = this.pushButton.bind(this);
  }

  pushButton() {
    memory.operate(this.operator);
  }
}

// ** ** ** ** ** ** ** **
// Create button objects
// ** ** ** ** ** ** ** **
const numberButtonArray = []

// Add event listener for number buttons
for (let i = 0; i < 10; i++) {
  let newNumberButton = new numberButton(i);

  let buttonElement = document.querySelector(`.num-button#n${i}`);
  buttonElement.addEventListener('click', newNumberButton.pushButton);

  numberButtonArray.push(newNumberButton);
}

// *** *** *** *** *** *** *** ***
// Add event listeners for operator buttons
// *** *** *** *** *** *** *** ***

// Addition button
let newOperatorButton = new operatorButton(ADD);
let buttonElement = document.querySelector('.op-button#add');
buttonElement.addEventListener('click', newOperatorButton.pushButton);

// Subraction button
newOperatorButton = new operatorButton(SUB);
buttonElement = document.querySelector('.op-button#sub');
buttonElement.addEventListener('click', newOperatorButton.pushButton);

// Multiplication button
newOperatorButton = new operatorButton(MUL);
buttonElement = document.querySelector('.op-button#mul');
buttonElement.addEventListener('click', newOperatorButton.pushButton);

// Divide button
newOperatorButton = new operatorButton(DIV);
buttonElement = document.querySelector('.op-button#div');
buttonElement.addEventListener('click', newOperatorButton.pushButton);

// Equals button
newOperatorButton = new operatorButton(EQ);
buttonElement = document.querySelector('.op-button#eq');
buttonElement.addEventListener('click', newOperatorButton.pushButton);

// ****************************
// Add CLEAR button event listener
// ****************************
buttonElement = document.querySelector('.func-button#clear');
buttonElement.addEventListener('click', memory.clear)