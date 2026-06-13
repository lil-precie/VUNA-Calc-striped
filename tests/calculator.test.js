const {
  calculateExpression,
  setCurrentExpression,
  evaluateCurrentExpression,
  clearExpression
} = require('../src/calculator');

describe('Calculator Engine', () => {

  test('adds two numbers', () => {
    expect(calculateExpression('2+3')).toBe(5);
  });

  test('multiplies two numbers', () => {
    expect(calculateExpression('2*4')).toBe(8);
  });

  test('operator precedence works', () => {
    expect(calculateExpression('2+3*4')).toBe(14);
  });

  test('power operator works', () => {
    expect(calculateExpression('2**3')).toBe(8);
  });

  test('invalid expression returns Error', () => {
    expect(calculateExpression('2+++')).toBe('Error');
  });

  test('evaluateCurrentExpression works', () => {
    clearExpression();
    setCurrentExpression('10+5');

    expect(evaluateCurrentExpression()).toBe('15');
  });

});