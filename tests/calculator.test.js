const { evaluateExpression } = require('../src/calculator');

describe('Calculator', () => {
  test('adds two numbers', () => {
    expect(evaluateExpression('2+3')).toBe(5);
  });

  test('multiplication works', () => {
    expect(evaluateExpression('2*4')).toBe(8);
  });
});