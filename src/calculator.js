#!/usr/bin/env node

/**
 * Supported calculator operations:
 * - addition (+, add)
 * - subtraction (-, subtract)
 * - multiplication (*, x, multiply)
 * - division (/, divide)
 */

function add(left, right) {
  return left + right;
}

function subtract(left, right) {
  return left - right;
}

function multiply(left, right) {
  return left * right;
}

function divide(left, right) {
  if (right === 0) {
    throw new Error("Division by zero is not allowed.");
  }

  return left / right;
}

const SUPPORTED_OPERATIONS = {
  "+": {
    name: "addition",
    calculate: add,
  },
  add: {
    name: "addition",
    calculate: add,
  },
  addition: {
    name: "addition",
    calculate: add,
  },
  "-": {
    name: "subtraction",
    calculate: subtract,
  },
  subtract: {
    name: "subtraction",
    calculate: subtract,
  },
  subtraction: {
    name: "subtraction",
    calculate: subtract,
  },
  "*": {
    name: "multiplication",
    calculate: multiply,
  },
  x: {
    name: "multiplication",
    calculate: multiply,
  },
  multiply: {
    name: "multiplication",
    calculate: multiply,
  },
  multiplication: {
    name: "multiplication",
    calculate: multiply,
  },
  "/": {
    name: "division",
    calculate: divide,
  },
  divide: {
    name: "division",
    calculate: divide,
  },
  division: {
    name: "division",
    calculate: divide,
  },
};

function printUsage() {
  console.log("Usage: node src/calculator.js <operation> <left> <right>");
  console.log("Operations: add (+), subtract (-), multiply (*, x), divide (/)");
  console.log("Example: node src/calculator.js add 8 2");
}

function parseNumber(value, label) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`${label} must be a valid number.`);
  }

  return parsed;
}

function getOperation(operationInput) {
  return SUPPORTED_OPERATIONS[String(operationInput).toLowerCase()];
}

function calculate(operationInput, leftInput, rightInput) {
  const operation = getOperation(operationInput);

  if (!operation) {
    throw new Error(`Unsupported operation: ${operationInput}`);
  }

  const left = parseNumber(leftInput, "The left operand");
  const right = parseNumber(rightInput, "The right operand");
  const result = operation.calculate(left, right);

  return {
    name: operation.name,
    left,
    right,
    result,
  };
}

function main(argv = process.argv.slice(2)) {
  const [operationInput, leftInput, rightInput] = argv;

  if (!operationInput || leftInput === undefined || rightInput === undefined) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const calculation = calculate(operationInput, leftInput, rightInput);

    console.log(
      `${calculation.name}: ${calculation.left} ${operationInput} ${calculation.right} = ${calculation.result}`
    );
  } catch (error) {
    console.error(error.message);
    if (error.message.startsWith("Unsupported operation:")) {
      printUsage();
    }
    process.exitCode = 1;
  }
}

module.exports = {
  SUPPORTED_OPERATIONS,
  add,
  subtract,
  multiply,
  divide,
  parseNumber,
  getOperation,
  calculate,
  printUsage,
  main,
};

if (require.main === module) {
  main();
}
