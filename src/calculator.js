// ==========================================
// 🧠 CALCULATOR CORE MATH ENGINE (TESTABLE)
// ==========================================

let LAST_RESULT = 0;
let currentExpression = "";

/**
 * Safe Math implementations to support trigonometry strings in eval
 */
const sinDeg = (deg) => Math.sin((deg * Math.PI) / 180);
const cosDeg = (deg) => Math.cos((deg * Math.PI) / 180);
const tanDeg = (deg) => Math.tan((deg * Math.PI) / 180);
const asinDeg = (val) => (Math.asin(val) * 180) / Math.PI;
const acosDeg = (val) => (Math.acos(val) * 180) / Math.PI;
const atanDeg = (val) => (Math.atan(val) * 180) / Math.PI;
const sinh = (val) => Math.sinh(val);
const asinh = (val) => Math.asinh(val);

function getCurrentExpression() {
  return currentExpression;
}

function setCurrentExpression(val) {
  currentExpression = String(val);
}

function clearExpression() {
  currentExpression = "";
}

function appendValue(value) {
  currentExpression += value.toString();
}

function appendOperator(value) {
  if (value === "^") {
    currentExpression += "**";
  } else {
    currentExpression += value;
  }
}

function backspaceExpression() {
  currentExpression = currentExpression.slice(0, -1);
}

function normalizeExpression(expr) {
  return expr
    .replace(/asin\(/g, "sinDeg(") // maps to our local safe math wrappers
    .replace(/acos\(/g, "cosDeg(")
    .replace(/atan\(/g, "tanDeg(")
    .replace(/sin\(/g, "sinDeg(")
    .replace(/cos\(/g, "cosDeg(")
    .replace(/tan\(/g, "tanDeg(")
    .replace(/asinh\(/g, "asinh(")
    .replace(/sinh\(/g, "sinh(")
    .replace(/\be\b/g, "Math.E")
    .replace(/\bpi\b/g, "Math.PI");
}

function processPercent() {
  if (!currentExpression) return;

  const match = currentExpression.match(/(.+?)(\*\*|[+\-*/^])([0-9.]*)$/);

  if (!match) {
    const num = parseFloat(currentExpression);
    if (isNaN(num)) return;
    currentExpression = (num / 100).toString();
  } else {
    const leftPart = match[1];
    const rightPart = match[3];

    if (!rightPart) return;

    let leftVal;
    try {
      // Internal execution context allows access to Math properties
      leftVal = eval(normalizeExpression(leftPart));
    } catch (e) {
      leftVal = parseFloat(leftPart);
    }

    const rightVal = parseFloat(rightPart);
    if (isNaN(leftVal) || isNaN(rightVal)) return;

    const percentVal = (leftVal * rightVal) / 100;
    currentExpression = percentVal.toString();
  }

  currentExpression += "*";
}

function calculateExpression(expression) {
  try {
    let normalizedExpression = normalizeExpression(expression);

    // Replace "ans" with last result automatically
    normalizedExpression = normalizedExpression.replace(/\bans\b/gi, LAST_RESULT);

    // Evaluated inside this scoped environment where custom functions exist
    let result = eval(normalizedExpression);
    
    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid Math Operation");
    }

    return result;
  } catch (e) {
    return "Error";
  }
}

function evaluateCurrentExpression() {
  if (!currentExpression) return null;

  let result = calculateExpression(currentExpression);
  result = String(result);

  if (result !== "Error") {
    LAST_RESULT = result;
    currentExpression = result;
  } else {
    currentExpression = ""; // reset state on error
  }
  
  return result;
}

// Export for Node environment testing (Jest/Mocha), fallback for plain browser scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getCurrentExpression,
    setCurrentExpression,
    clearExpression,
    appendValue,
    appendOperator,
    backspaceExpression,
    processPercent,
    calculateExpression,
    evaluateCurrentExpression
  };
}