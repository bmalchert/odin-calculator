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

  // string variable for when the display value is different than the numeric
  // value (e.g. when we want a decimal dot before any digits after the decimal)
  x_string: '',
  
  lastOperator: EQ,
  newDigitFlag: true,

  addDigit: function(n) {
    // Prevent user adding multiple decimal places
    if (n === '.' && this.x_string.includes('.')) {
      return
    }

    if (this.newDigitFlag) {
      this.y = this.x;
      this.x = 0;
      this.x_string = '';

      if (n === 0) {
        display.populate(this.x);
        return;
      }

      this.newDigitFlag = false;

    }
    
    this.x_string = String(this.x_string) + String(n);
    this.x = Number(this.x_string);
    display.populate(this.x_string);
  },

  operate: function(op) {
    
    if (this.lastOperator !== EQ) {
      this.x = operate(this.x, this.y, this.lastOperator);
      this.x_string = String(this.x)
      display.populate(this.x_string);
    }

    this.newDigitFlag = true;
    this.lastOperator = op;
  },

  clear: function() {
    this.x = 0;
    this.x_string = '';
    this.y = 0;
    this.lastOperator = EQ;
    this.newDigitFlag = true;
    display.clear();
  },

  backspace: function() {
    this.x_string = this.x_string.slice(0,-1);
    this.x = Number(this.x_string);
    if (this.x_string === '') {
      display.clear();
    } else {
      display.populate(this.x_string);
    }
  }
}

// Bind the `this` for the memory object. These funcions need to be bound since
// they are event handlers for buttons.
memory.clear = memory.clear.bind(memory)
memory.backspace = memory.backspace.bind(memory)

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
    // Print memory variables to consol
    // console.log("x: " + memory.x);
    // console.log("y: " + memory.y);
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

// Add event listener for dot button
let newNumberButton = new numberButton('.');
let buttonElement = document.querySelector('.num-button#dot');
buttonElement.addEventListener('click', newNumberButton.pushButton);

// *** *** *** *** *** *** *** ***
// Add event listeners for operator buttons
// *** *** *** *** *** *** *** ***

// Addition button
newOperatorButton = new operatorButton(ADD);
buttonElement = document.querySelector('.op-button#add');
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

// ****************************
// Add BACKSPACE button event listener
// ****************************
buttonElement = document.querySelector('.func-button#backspace');
buttonElement.addEventListener('click', memory.backspace)

// *********************************
// Keyboard Listener
// *********************************
addEventListener('keydown', keyboardHandler)

function keyboardHandler(e) {
  let key = e.key

  // When the keyboard press is a digit
  if (0 <= key && key <= 9) {
    memory.addDigit(Number(key))
    return
  }

  // When the keyboard press is an operator, period, backspace, etc.
  if (key === '+')                          memory.operate(ADD)
  else if (key === '-')                     memory.operate(SUB)
  else if (key === '*')                     memory.operate(MUL)
  else if (key === '/')                     memory.operate(DIV)
  else if (key === '=' || key === 'Enter')  memory.operate(EQ)
  else if (key === '.')                     memory.addDigit('.')
  else if (key === 'Backspace' 
      || key === 'Delete')                  memory.backspace()
  else if (key === 'Escape')                memory.clear()
}