const {
  SUPPORTED_OPERATIONS,
  add,
  subtract,
  multiply,
  divide,
  parseNumber,
  getOperation,
  calculate,
} = require("../calculator");

describe("calculator arithmetic functions", () => {
  test("adds numbers", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-4, 9)).toBe(5);
    expect(add(2.5, 1.5)).toBe(4);
  });

  test("subtracts numbers", () => {
    expect(subtract(10, 4)).toBe(6);
    expect(subtract(4, 10)).toBe(-6);
    expect(subtract(5.5, 2.5)).toBe(3);
  });

  test("multiplies numbers", () => {
    expect(multiply(45, 2)).toBe(90);
    expect(multiply(-3, 7)).toBe(-21);
    expect(multiply(1.5, 2)).toBe(3);
  });

  test("divides numbers", () => {
    expect(divide(20, 5)).toBe(4);
    expect(divide(7.5, 2.5)).toBe(3);
    expect(divide(-12, 3)).toBe(-4);
  });

  test("throws on division by zero", () => {
    expect(() => divide(8, 0)).toThrow("Division by zero is not allowed.");
  });
});

describe("calculator helpers", () => {
  test("parses valid numeric input", () => {
    expect(parseNumber("42", "value")).toBe(42);
    expect(parseNumber("-3.5", "value")).toBe(-3.5);
  });

  test("rejects invalid numeric input", () => {
    expect(() => parseNumber("abc", "value")).toThrow("value must be a valid number.");
  });

  test("resolves operation aliases", () => {
    expect(getOperation("+")).toBe(SUPPORTED_OPERATIONS["+"]);
    expect(getOperation("ADD")).toBe(SUPPORTED_OPERATIONS.add);
    expect(getOperation("subtraction")).toBe(SUPPORTED_OPERATIONS.subtraction);
    expect(getOperation("x")).toBe(SUPPORTED_OPERATIONS.x);
    expect(getOperation("DIVIDE")).toBe(SUPPORTED_OPERATIONS.divide);
  });

  test("returns undefined for unsupported operations", () => {
    expect(getOperation("mod")).toBeUndefined();
  });
});

describe("calculate", () => {
  test("supports the image examples", () => {
    expect(calculate("+", "2", "3")).toEqual({
      name: "addition",
      left: 2,
      right: 3,
      result: 5,
    });

    expect(calculate("-", "10", "4")).toEqual({
      name: "subtraction",
      left: 10,
      right: 4,
      result: 6,
    });

    expect(calculate("*", "45", "2")).toEqual({
      name: "multiplication",
      left: 45,
      right: 2,
      result: 90,
    });

    expect(calculate("/", "20", "5")).toEqual({
      name: "division",
      left: 20,
      right: 5,
      result: 4,
    });
  });

  test("supports word-based operation names", () => {
    expect(calculate("add", "8", "2").result).toBe(10);
    expect(calculate("subtract", "8", "2").result).toBe(6);
    expect(calculate("multiply", "8", "2").result).toBe(16);
    expect(calculate("divide", "8", "2").result).toBe(4);
  });

  test("throws for unsupported operations", () => {
    expect(() => calculate("mod", "8", "2")).toThrow("Unsupported operation: mod");
  });

  test("throws for invalid operands", () => {
    expect(() => calculate("add", "eight", "2")).toThrow(
      "The left operand must be a valid number."
    );
    expect(() => calculate("add", "8", "two")).toThrow(
      "The right operand must be a valid number."
    );
  });

  test("throws when division uses zero", () => {
    expect(() => calculate("divide", "8", "0")).toThrow("Division by zero is not allowed.");
  });
});
