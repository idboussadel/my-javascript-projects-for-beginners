// We select the previous number element and the current number element
const prevNumber = document.querySelector(".previous-num");
const currentNumber = document.querySelector(".current-num");

// We select all the operator buttons and all the number buttons
const operatorbtn = document.querySelectorAll(".operator");
const numberbtn = document.querySelectorAll(".nbrs-btns");

// We select the clear button, equal sign button and the delete button
const clearbtn = document.querySelector(".all-clear");
const equalbtn = document.querySelector(".equal-sign");
const deletebtn = document.querySelector(".delete");

// We define a Calculator class
// we define a class because we need to
// store prevNumber and currentNumber
// if it was a simple calculator we can do it without a class
class Calculator {
  constructor(prevNumber, currentNumber) {
    this.prevNumber = prevNumber;
    this.currentNumber = currentNumber;
    //As soon as we create a new calculator
    //we call the clear function to reset the inputs.
    this.clear();
  }

  // Method to reset the input values
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Method to append a number to the current operand
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    if (this.currentOperand === "" && this.operation === undefined) {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "×":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentNumber.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.prevNumber.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.prevNumber.innerText = "";
    }
  }
}

// We create a new Calculator object with the previous number and current number elements
const calculator = new Calculator(prevNumber, currentNumber);

numberbtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorbtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalbtn.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearbtn.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deletebtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
