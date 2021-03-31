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
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

// ******************************
// Operation function
//
// Accepts two operands and an operator and calls the appropriate math function
// ******************************

const   ADD   =   'add';
const   SUB   =   'subtract';
const   MUL   =   'multiply';
const   DIV   =   'divide';
const   OPERR =   'invalid operator';

function operate(x, y, op) {
  let value;

  switch (op) {
    case 'add':
      value = add(x, y);
      break;

    case 'subtract':
      value = subtract(x, y);
      break;

    case 'multiply':
      value = multiply(x, y);
      break;

    case 'divide':
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

