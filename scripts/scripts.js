const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let firstNumber = "";
let operator = "";
let waitingForSecond = false;

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.key;
    const op = button.dataset.op;
    const action = button.dataset.action;

    // Number input
    if (key !== undefined) {
      if (waitingForSecond) {
        display.value = "";
        waitingForSecond = false;
      }
      if (key === "." && display.value.includes(".")) return; // prevent multiple decimals
      display.value += key;
    }

    // Operator input
    if (op !== undefined) {
      if (operator && !waitingForSecond) {
        calculate();
      }
      firstNumber = display.value;
      operator = op;
      waitingForSecond = true;
    }

    // Equals
    if (action === "equals") {
      calculate();
      operator = "";
    }

    // Clear
    if (action === "clear") {
      display.value = "";
      firstNumber = "";
      operator = "";
      waitingForSecond = false;
    }
  });
});

function calculate() {
  const secondNumber = display.value;
  let result;

  switch (operator) {
    case "+": result = Number(firstNumber) + Number(secondNumber); break;
    case "-": result = Number(firstNumber) - Number(secondNumber); break;
    case "x": result = Number(firstNumber) * Number(secondNumber); break;
    case "÷": result = Number(firstNumber) / Number(secondNumber); break;
    default: return;
  }

  display.value = result;
  firstNumber = result;
  waitingForSecond = true;
}

