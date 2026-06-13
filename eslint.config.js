const js = require('@eslint/js');

module.exports = [
  { 
    ignores: [
      'dist/', 
      'coverage/', 
      'node_modules/', 
      'assets/js/bootstrap.min.js', 
      'assets/css/'
    ] 
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021, 
      sourceType: 'commonjs',
      globals: { 
        window: 'readonly', 
        document: 'readonly', 
        localStorage: 'readonly', 
        console: 'readonly',
        module: 'writable', 
        require: 'readonly', 
        process: 'readonly',
        describe: 'readonly', 
        it: 'readonly', 
        expect: 'readonly',
        // Global variables inside your script
        LAST_RESULT: 'writable',
        currentExpression: 'writable',
        appendToResult: 'readonly',
        bracketToResult: 'readonly',
        backspace: 'readonly',
        operatorToResult: 'readonly',
        clearResult: 'readonly',
        calculateResult: 'readonly',
        toggleTheme: 'readonly'
      },
    },
    rules: { 
      'no-unused-vars': 'warn', 
      'eqeqeq': 'error', 
      'semi': ['error', 'always'] 
    },
  }
];