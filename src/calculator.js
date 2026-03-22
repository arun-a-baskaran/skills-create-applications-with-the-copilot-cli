/**
 * Node.js CLI Calculator
 *
 * Supported calculator operations:
 *   - addition      (+, add, addition)
 *   - subtraction   (-, subtract, subtraction)
 *   - multiplication (*, x, multiply, multiplication)
 *   - division      (/, divide, division)
 *   - modulo        (%, mod, modulo)
 *   - power         (^, **, pow, power, exponentiation)
 *   - squareRoot    (sqrt, squareroot, "square root")
 *
 * Usage: node src/calculator.js <operation> <number1> [number2]
 *
 * Examples:
 *   node src/calculator.js add 7 3
 *   node src/calculator.js subtract 10 4
 *   node src/calculator.js multiply 6 5
 *   node src/calculator.js divide 8 2
 *   node src/calculator.js modulo 5 2
 *   node src/calculator.js power 2 3
 *   node src/calculator.js sqrt 16
 */

// --- Pure arithmetic functions ---

/** Returns the sum of left and right. */
function add(left, right) {
  return left + right;
}

/** Returns the difference of left minus right. */
function subtract(left, right) {
  return left - right;
}

/** Returns the product of left and right. */
function multiply(left, right) {
  return left * right;
}

/** Returns the quotient of left divided by right. Throws on division by zero. */
function divide(left, right) {
  if (right === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return left / right;
}

/** Returns the remainder of left divided by right. Throws when divisor is zero. */
function modulo(left, right) {
  if (right === 0) {
    throw new Error('Modulo by zero is not allowed');
  }
  return left % right;
}

/** Returns base raised to the power of exponent. */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/** Returns the square root of n. Throws for negative numbers. */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed');
  }
  return Math.sqrt(n);
}

// --- Operation registry ---

/**
 * Maps user-facing aliases to their handler functions and metadata.
 * Unary operations (squareRoot) use a single operand.
 */
const SUPPORTED_OPERATIONS = {
  '+':             { fn: add,        name: 'addition',        unary: false },
  add:             { fn: add,        name: 'addition',        unary: false },
  addition:        { fn: add,        name: 'addition',        unary: false },
  '-':             { fn: subtract,   name: 'subtraction',     unary: false },
  subtract:        { fn: subtract,   name: 'subtraction',     unary: false },
  subtraction:     { fn: subtract,   name: 'subtraction',     unary: false },
  '*':             { fn: multiply,   name: 'multiplication',  unary: false },
  x:               { fn: multiply,   name: 'multiplication',  unary: false },
  multiply:        { fn: multiply,   name: 'multiplication',  unary: false },
  multiplication:  { fn: multiply,   name: 'multiplication',  unary: false },
  '/':             { fn: divide,     name: 'division',        unary: false },
  divide:          { fn: divide,     name: 'division',        unary: false },
  division:        { fn: divide,     name: 'division',        unary: false },
  '%':             { fn: modulo,     name: 'modulo',          unary: false },
  mod:             { fn: modulo,     name: 'modulo',          unary: false },
  modulo:          { fn: modulo,     name: 'modulo',          unary: false },
  '^':             { fn: power,      name: 'power',           unary: false },
  '**':            { fn: power,      name: 'power',           unary: false },
  pow:             { fn: power,      name: 'power',           unary: false },
  power:           { fn: power,      name: 'power',           unary: false },
  exponentiation:  { fn: power,      name: 'power',           unary: false },
  sqrt:            { fn: squareRoot, name: 'squareRoot',      unary: true  },
  squareroot:      { fn: squareRoot, name: 'squareRoot',      unary: true  },
};

// --- CLI helpers ---

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <number1> [number2]');
  console.log('');
  console.log('Binary operations (require two numbers):');
  console.log('  add | +              addition');
  console.log('  subtract | -         subtraction');
  console.log('  multiply | * | x     multiplication');
  console.log('  divide | /           division');
  console.log('  modulo | % | mod     modulo (remainder)');
  console.log('  power | ^ | ** | pow exponentiation');
  console.log('');
  console.log('Unary operations (require one number):');
  console.log('  sqrt | squareroot    square root');
}

/**
 * Parses a string value as a finite number.
 * @param {string} value
 * @param {string} label - used in error messages
 * @returns {number}
 */
function parseNumber(value, label) {
  if (value === undefined || value === null || String(value).trim() === '') {
    throw new Error(`Invalid ${label}: "${value}" is not a valid number`);
  }
  const n = Number(value);
  if (!Number.isFinite(n)) {
    throw new Error(`Invalid ${label}: "${value}" is not a valid number`);
  }
  return n;
}

/**
 * Looks up an operation entry from SUPPORTED_OPERATIONS.
 * @param {string} operationInput
 * @returns {{ fn: Function, name: string, unary: boolean }}
 */
function getOperation(operationInput) {
  const key = operationInput.toLowerCase();
  const op = SUPPORTED_OPERATIONS[key];
  if (!op) {
    throw new Error(`Unsupported operation: "${operationInput}". Run with no arguments to see usage.`);
  }
  return op;
}

/**
 * Performs a calculation given string inputs.
 * @param {string} operationInput
 * @param {string} leftInput
 * @param {string} [rightInput]
 * @returns {number}
 */
function calculate(operationInput, leftInput, rightInput) {
  const op = getOperation(operationInput);

  if (op.unary) {
    const left = parseNumber(leftInput, 'number');
    return op.fn(left);
  }

  const left = parseNumber(leftInput, 'left operand');
  const right = parseNumber(rightInput, 'right operand');
  return op.fn(left, right);
}

/**
 * CLI entry point.
 * @param {string[]} argv - command-line arguments (defaults to process.argv.slice(2))
 */
function main(argv = process.argv.slice(2)) {
  if (argv.length === 0) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [operationInput, leftInput, rightInput] = argv;

  let op;
  try {
    op = getOperation(operationInput);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  const expectedArgs = op.unary ? 1 : 2;
  const providedArgs = op.unary ? (leftInput !== undefined ? 1 : 0) : (rightInput !== undefined ? 2 : leftInput !== undefined ? 1 : 0);

  if (providedArgs < expectedArgs) {
    console.error(`Error: "${operationInput}" requires ${expectedArgs} number argument(s), but got ${providedArgs}.`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  let result;
  try {
    result = calculate(operationInput, leftInput, rightInput);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
    return;
  }

  if (op.unary) {
    console.log(`${op.name}: ${operationInput} ${leftInput} = ${result}`);
  } else {
    console.log(`${op.name}: ${leftInput} ${operationInput} ${rightInput} = ${result}`);
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
