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
}

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

