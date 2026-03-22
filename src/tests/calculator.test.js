'use strict';

const {
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
} = require('../calculator');

// ---------------------------------------------------------------------------
// Basic arithmetic functions
// ---------------------------------------------------------------------------

describe('add', () => {
  test('adds two positive numbers', () => expect(add(2, 3)).toBe(5));
  test('adds a positive and a negative number', () => expect(add(10, -4)).toBe(6));
  test('adds two negative numbers', () => expect(add(-3, -7)).toBe(-10));
  test('identity: adding zero', () => expect(add(5, 0)).toBe(5));
  test('image example: 2 + 3 = 5', () => expect(add(2, 3)).toBe(5));
});

describe('subtract', () => {
  test('subtracts two positive numbers', () => expect(subtract(10, 4)).toBe(6));
  test('subtracts resulting in a negative', () => expect(subtract(3, 7)).toBe(-4));
  test('subtracts zero', () => expect(subtract(5, 0)).toBe(5));
  test('image example: 10 - 4 = 6', () => expect(subtract(10, 4)).toBe(6));
});

describe('multiply', () => {
  test('multiplies two positive numbers', () => expect(multiply(6, 5)).toBe(30));
  test('multiplies by zero', () => expect(multiply(9, 0)).toBe(0));
  test('multiplies two negative numbers', () => expect(multiply(-3, -4)).toBe(12));
  test('multiplies a positive and a negative', () => expect(multiply(5, -2)).toBe(-10));
  test('image example: 45 * 2 = 90', () => expect(multiply(45, 2)).toBe(90));
});

describe('divide', () => {
  test('divides two positive numbers', () => expect(divide(8, 2)).toBe(4));
  test('divides resulting in a decimal', () => expect(divide(7, 2)).toBe(3.5));
  test('divides a negative by a positive', () => expect(divide(-9, 3)).toBe(-3));
  test('image example: 20 / 5 = 4', () => expect(divide(20, 5)).toBe(4));
  test('throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
  });
});

// ---------------------------------------------------------------------------
// New extended operations
// ---------------------------------------------------------------------------

describe('modulo', () => {
  test('image example: 5 % 2 = 1', () => expect(modulo(5, 2)).toBe(1));
  test('even division gives zero remainder', () => expect(modulo(10, 5)).toBe(0));
  test('modulo with larger divisor', () => expect(modulo(3, 7)).toBe(3));
  test('modulo of a negative dividend', () => expect(modulo(-7, 3)).toBe(-1));
  test('throws when divisor is zero', () => {
    expect(() => modulo(5, 0)).toThrow('Modulo by zero is not allowed');
  });
});

describe('power', () => {
  test('image example: 2 ^ 3 = 8', () => expect(power(2, 3)).toBe(8));
  test('any number to the power of zero is 1', () => expect(power(5, 0)).toBe(1));
  test('any number to the power of 1 is itself', () => expect(power(7, 1)).toBe(7));
  test('fractional exponent (square root)', () => expect(power(9, 0.5)).toBe(3));
  test('negative base with even exponent', () => expect(power(-2, 4)).toBe(16));
  test('negative base with odd exponent', () => expect(power(-2, 3)).toBe(-8));
});

describe('squareRoot', () => {
  test('image example: √16 = 4', () => expect(squareRoot(16)).toBe(4));
  test('square root of 9 is 3', () => expect(squareRoot(9)).toBe(3));
  test('square root of 2', () => expect(squareRoot(2)).toBeCloseTo(1.4142, 4));
  test('square root of 0 is 0', () => expect(squareRoot(0)).toBe(0));
  test('square root of 1 is 1', () => expect(squareRoot(1)).toBe(1));
  test('throws for negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed');
  });
  test('throws for any negative value', () => {
    expect(() => squareRoot(-100)).toThrow('Square root of a negative number is not allowed');
  });
});

// ---------------------------------------------------------------------------
// Helper: parseNumber
// ---------------------------------------------------------------------------

describe('parseNumber', () => {
  test('parses an integer string', () => expect(parseNumber('42', 'x')).toBe(42));
  test('parses a float string', () => expect(parseNumber('3.14', 'x')).toBeCloseTo(3.14));
  test('parses a negative string', () => expect(parseNumber('-7', 'x')).toBe(-7));
  test('throws for a non-numeric string', () => {
    expect(() => parseNumber('abc', 'left operand')).toThrow('Invalid left operand');
  });
  test('throws for empty string', () => {
    expect(() => parseNumber('', 'right operand')).toThrow('Invalid right operand');
  });
  test('throws for Infinity', () => {
    expect(() => parseNumber('Infinity', 'x')).toThrow('Invalid x');
  });
});

// ---------------------------------------------------------------------------
// Helper: getOperation
// ---------------------------------------------------------------------------

describe('getOperation', () => {
  test('resolves "add"', () => expect(getOperation('add').name).toBe('addition'));
  test('resolves "+"', () => expect(getOperation('+').name).toBe('addition'));
  test('resolves "subtract"', () => expect(getOperation('subtract').name).toBe('subtraction'));
  test('resolves "-"', () => expect(getOperation('-').name).toBe('subtraction'));
  test('resolves "multiply"', () => expect(getOperation('multiply').name).toBe('multiplication'));
  test('resolves "*"', () => expect(getOperation('*').name).toBe('multiplication'));
  test('resolves "x" (alias)', () => expect(getOperation('x').name).toBe('multiplication'));
  test('resolves "divide"', () => expect(getOperation('divide').name).toBe('division'));
  test('resolves "/"', () => expect(getOperation('/').name).toBe('division'));
  test('resolves "modulo"', () => expect(getOperation('modulo').name).toBe('modulo'));
  test('resolves "%"', () => expect(getOperation('%').name).toBe('modulo'));
  test('resolves "mod"', () => expect(getOperation('mod').name).toBe('modulo'));
  test('resolves "power"', () => expect(getOperation('power').name).toBe('power'));
  test('resolves "^"', () => expect(getOperation('^').name).toBe('power'));
  test('resolves "**"', () => expect(getOperation('**').name).toBe('power'));
  test('resolves "pow"', () => expect(getOperation('pow').name).toBe('power'));
  test('resolves "exponentiation"', () => expect(getOperation('exponentiation').name).toBe('power'));
  test('resolves "sqrt"', () => expect(getOperation('sqrt').name).toBe('squareRoot'));
  test('resolves "squareroot" (case-insensitive)', () => expect(getOperation('SQUAREROOT').name).toBe('squareRoot'));
  test('throws for an unsupported operation', () => {
    expect(() => getOperation('logarithm')).toThrow('Unsupported operation: "logarithm"');
  });
});

// ---------------------------------------------------------------------------
// calculate (integration-level)
// ---------------------------------------------------------------------------

describe('calculate', () => {
  test('add via calculate', () => expect(calculate('add', '2', '3')).toBe(5));
  test('subtract via calculate', () => expect(calculate('subtract', '10', '4')).toBe(6));
  test('multiply via calculate', () => expect(calculate('multiply', '45', '2')).toBe(90));
  test('divide via calculate', () => expect(calculate('divide', '20', '5')).toBe(4));
  test('modulo via calculate - image example', () => expect(calculate('modulo', '5', '2')).toBe(1));
  test('power via calculate - image example', () => expect(calculate('power', '2', '3')).toBe(8));
  test('sqrt via calculate - image example (unary)', () => expect(calculate('sqrt', '16')).toBe(4));
  test('throws on division by zero', () => {
    expect(() => calculate('divide', '10', '0')).toThrow('Division by zero is not allowed');
  });
  test('throws on modulo by zero', () => {
    expect(() => calculate('modulo', '5', '0')).toThrow('Modulo by zero is not allowed');
  });
  test('throws on sqrt of negative', () => {
    expect(() => calculate('sqrt', '-9')).toThrow('Square root of a negative number is not allowed');
  });
  test('throws on invalid number input', () => {
    expect(() => calculate('add', 'foo', '3')).toThrow('Invalid left operand');
  });
  test('throws on unsupported operation', () => {
    expect(() => calculate('log', '10', '2')).toThrow('Unsupported operation');
  });
});

// ---------------------------------------------------------------------------
// SUPPORTED_OPERATIONS shape
// ---------------------------------------------------------------------------

describe('SUPPORTED_OPERATIONS', () => {
  test('contains all expected aliases', () => {
    const aliases = ['+', 'add', 'addition', '-', 'subtract', 'subtraction',
      '*', 'x', 'multiply', 'multiplication', '/', 'divide', 'division',
      '%', 'mod', 'modulo', '^', '**', 'pow', 'power', 'exponentiation',
      'sqrt', 'squareroot'];
    aliases.forEach(alias => expect(SUPPORTED_OPERATIONS).toHaveProperty(alias));
  });
  test('squareRoot is marked as unary', () => {
    expect(SUPPORTED_OPERATIONS['sqrt'].unary).toBe(true);
    expect(SUPPORTED_OPERATIONS['squareroot'].unary).toBe(true);
  });
  test('binary operations are not marked as unary', () => {
    ['add', 'subtract', 'multiply', 'divide', 'modulo', 'power'].forEach(alias => {
      expect(SUPPORTED_OPERATIONS[alias].unary).toBe(false);
    });
  });
});
