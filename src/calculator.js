#!/usr/bin/env node

/**
 * Supported calculator operations:
 * - addition (+, add)
 * - subtraction (-, subtract)
 * - multiplication (*, x, multiply)
 * - division (/, divide)
 * - modulo (%, mod, modulo)
 * - power (^, pow, power)
 * - square root (sqrt, √)
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

function modulo(left, right) {
  if (right === 0) {
    throw new Error("Modulo by zero is not allowed.");
  }

  return left % right;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error("Square root of a negative number is not allowed.");
  }

  return Math.sqrt(value);
}

const SUPPORTED_OPERATIONS = {
  "+": {
    name: "addition",
    calculate: add,
    arity: 2,
  },
  add: {
    name: "addition",
    calculate: add,
    arity: 2,
  },
  addition: {
    name: "addition",
    calculate: add,
    arity: 2,
  },
  "-": {
    name: "subtraction",
    calculate: subtract,
    arity: 2,
  },
  subtract: {
    name: "subtraction",
    calculate: subtract,
    arity: 2,
  },
  subtraction: {
    name: "subtraction",
    calculate: subtract,
    arity: 2,
  },
  "*": {
    name: "multiplication",
    calculate: multiply,
    arity: 2,
  },
  x: {
    name: "multiplication",
    calculate: multiply,
    arity: 2,
  },
  multiply: {
    name: "multiplication",
    calculate: multiply,
    arity: 2,
  },
  multiplication: {
    name: "multiplication",
    calculate: multiply,
    arity: 2,
  },
  "/": {
    name: "division",
    calculate: divide,
    arity: 2,
  },
  divide: {
    name: "division",
    calculate: divide,
    arity: 2,
  },
  division: {
    name: "division",
    calculate: divide,
    arity: 2,
  },
  "%": {
    name: "modulo",
    calculate: modulo,
    arity: 2,
  },
  mod: {
    name: "modulo",
    calculate: modulo,
    arity: 2,
  },
  modulo: {
    name: "modulo",
    calculate: modulo,
    arity: 2,
  },
  "^": {
    name: "power",
    calculate: power,
    arity: 2,
  },
  pow: {
    name: "power",
    calculate: power,
    arity: 2,
  },
  power: {
    name: "power",
    calculate: power,
    arity: 2,
  },
  sqrt: {
    name: "square root",
    calculate: squareRoot,
    arity: 1,
  },
  squareroot: {
    name: "square root",
    calculate: squareRoot,
    arity: 1,
  },
  "√": {
    name: "square root",
    calculate: squareRoot,
    arity: 1,
  },
};

function printUsage() {
  console.log("Usage: node src/calculator.js <operation> <left> [right]");
  console.log(
    "Operations: add (+), subtract (-), multiply (*, x), divide (/), modulo (%, mod), power (^, pow), square root (sqrt, √)"
  );
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
  const right =
    operation.arity === 2 ? parseNumber(rightInput, "The right operand") : undefined;
  const result = operation.arity === 2 ? operation.calculate(left, right) : operation.calculate(left);

  return {
    name: operation.name,
    left,
    right,
    result,
  };
}

function main(argv = process.argv.slice(2)) {
  const [operationInput, leftInput, rightInput] = argv;
  const operation = operationInput ? getOperation(operationInput) : undefined;

  if (
    !operationInput ||
    leftInput === undefined ||
    (operation && operation.arity === 2 && rightInput === undefined)
  ) {
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
  modulo,
  power,
  squareRoot,
  parseNumber,
  getOperation,
  calculate,
  printUsage,
  main,
};

if (require.main === module) {
  main();
}
