// ==========================================
// 🧠 SMART RESULT MEMORY & CALCULATOR STATE
// ==========================================

let LAST_RESULT = 0;
var currentExpression = "";

// State tracking
let left = "";
let operator = "";
let right = "";
let steps = [];
const MAX_STEPS = 6;

/**
 * Safe Math wrappers to evaluate custom strings safely inside eval()
 */
const sinDeg = (deg) => Math.sin((deg * Math.PI) / 180);
const cosDeg = (deg) => Math.cos((deg * Math.PI) / 180);
const tanDeg = (deg) => Math.tan((deg * Math.PI) / 180);
const asinDeg = (val) => (Math.asin(val) * 180) / Math.PI;
const acosDeg = (val) => (Math.acos(val) * 180) / Math.PI;
const atanDeg = (val) => (Math.atan(val) * 180) / Math.PI;
const sinh = (val) => Math.sinh(val);
const asinh = (val) => Math.asinh(val);
const log10 = (val) => Math.log10(val); // Base-10 Logarithm

// ------------------------------
// Basic Calculator Functions
// ------------------------------
function appendToResult(value) {
  currentExpression += value.toString();
  updateResult();
}

function bracketToResult(value) {
  currentExpression += value;
  updateResult();
}

// Fixed to automatically trigger standard updates across inputs
window.addEventListener("DOMContentLoaded", function () {
  updateResult();
});

function backspace() {
  currentExpression = currentExpression.slice(0, -1);
  updateResult();
}

function operatorToResult(value) {
  if (value === "^") {
    currentExpression += "**";
  } else {
    currentExpression += value;
  }
  updateResult();
}

function clearResult() {
  currentExpression = "";
  updateResult();
}

function normalizeExpression(expr) {
  return expr
    .replace(/asin\(/g, "asinDeg(")
    .replace(/acos\(/g, "acosDeg(")
    .replace(/atan\(/g, "atanDeg(")
    .replace(/sin\(/g, "sinDeg(")
    .replace(/cos\(/g, "cosDeg(")
    .replace(/tan\(/g, "tanDeg(")
    .replace(/asinh\(/g, "asinh(")
    .replace(/sinh\(/g, "sinh(")
    .replace(/log\(/g, "log10(") 
    .replace(/\be\b/g, "Math.E")
    .replace(/\bpi\b/g, "Math.PI");
}

function percentToResult() {
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
  updateResult();
}

// ------------------------------
// Calculate Result
// ------------------------------
function calculateExpression(expression) {
  try {
    let normalizedExpression = normalizeExpression(expression);

    normalizedExpression = normalizedExpression.replace(
      /\bans\b/gi,
      LAST_RESULT,
    );

    let result = eval(normalizedExpression);
    console.log("Calculated result for expression:", expression, "->", result);
 
    if (isNaN(result) || !isFinite(result)) {
      throw new Error();
    }

    return result;
  } catch (e) {
    return "Error";
  }
}

function calculateResult() {
  if (!currentExpression) return;
  const display = document.getElementById("result"); 
  
  let result = calculateExpression(currentExpression);
  result = String(result);

  if (result !== "Error") {
    LAST_RESULT = result;
    currentExpression = result;
  } else {
    currentExpression = ""; 
  }

  display.value = result;
  updateResult();
}

function updateResult() {
  const display = document.getElementById("result");
  if (display) {
    display.value = currentExpression || "0";
  }
}

// ------------------------------
// Theme Toggle Logic
// ------------------------------
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");

  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.innerHTML = "☀️";
    btn.title = "Switch to light mode";
    localStorage.setItem("theme", "dark");
  } else {
    btn.innerHTML = "🌙";
    btn.title = "Switch to dark mode";
    localStorage.setItem("theme", "light");
  }
}

// Set theme on page load from localStorage
window.addEventListener("DOMContentLoaded", function () {
  const theme = localStorage.getItem("theme");
  const body = document.body;
  const btn = document.getElementById("theme-toggle");

  if (btn) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      btn.innerHTML = "☀️";
      btn.title = "Switch to light mode";
    } else {
      body.classList.remove("dark-mode"); // ✨ FIX: Changed from .add() to .remove()
      btn.innerHTML = "🌙";
      btn.title = "Switch to dark mode";
    }
  }
});