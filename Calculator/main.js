const buttonValues = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

const rightSymbols = ["÷", "×", "-", "+", "="];
const topSymbols = ["AC", "+/-", "%"];

// One operator and two operands
let A = 0;
let operator = null;
let B = null;

function clearAll() {
  A = 0;
  operator = null;
  B = null;
}

const display = document.getElementById("display");

// Shrinks display font size based on number length
function shrinkDisplayFont() {
  const length = display.value.length;

  if (length <= 11) {
    display.style.fontSize = "3.75rem";
  } else if (length <= 15) {
    display.style.fontSize = "2.75rem";
  } else if (length <= 20) {
    display.style.fontSize = "1.75rem";
  } else {
    display.style.fontSize = "1rem";
  }
}

for (let i = 0; i < buttonValues.length; i++) {
  let value = buttonValues[i];
  let button = document.createElement("button");
  button.innerText = value;

  // Styling special buttons
  if (value == "0") {
    button.style.width = "200px";
    button.style.gridColumn = "span 2";
  }
  if (rightSymbols.includes(value)) {
    button.style.backgroundColor = "#8f5402ff";
  } else if (topSymbols.includes(value)) {
    button.style.backgroundColor = "#D4D4D2";
    button.style.color = "#1C1C1C";
  }

  button.addEventListener("click", function () {
    if (rightSymbols.includes(value)) {
      if (value == "=") {
        if (A !== null && operator !== null) {
          B = display.value;
          const numA = Number(A);
          const numB = Number(B);

          let result = 0;
          if (operator === "÷") {
            result = numA / numB;
          } else if (operator === "×") {
            result = numA * numB;
          } else if (operator === "-") {
            result = numA - numB;
          } else if (operator === "+") {
            result = numA + numB;
          }

          display.value = result;
          shrinkDisplayFont(); // Show result in correct font size
          clearAll();
        }
      } else {
        A = display.value;
        operator = value;
        display.value = "";
      }
    } else if (topSymbols.includes(value)) {
      if (value == "AC") {
        clearAll();
        display.value = "";
        shrinkDisplayFont();
      } else if (value == "+/-") {
        if (display.value != "" && display.value != "0") {
          if (display.value[0] == "-") {
            display.value = display.value.slice(1);
          } else {
            display.value = "-" + display.value;
          }
        }
        shrinkDisplayFont();
      } else if (value == "%") {
        display.value = Number(display.value) / 100;
        shrinkDisplayFont();
      }
    } else {
      // Numbers and dot
      if (value == ".") {
        if (display.value != "" && !display.value.includes(value)) {
          display.value += value;
          shrinkDisplayFont();
        }
      } else if (display.value == "0") {
        display.value = value;
        shrinkDisplayFont();
      } else {
        display.value += value;
        shrinkDisplayFont();
      }
    }
  });

  // Append button to the div with id="buttons"
  document.getElementById("buttons").appendChild(button);
}
