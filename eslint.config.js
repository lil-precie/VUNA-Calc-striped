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

        // Jest globals
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',

        // Calculator globals
        LAST_RESULT: 'writable',
        currentExpression: 'writable',
        appendToResult: 'readonly',
        bracketToResult: 'readonly',
        backspace: 'readonly',
        operatorToResult: 'readonly',
        clearResult: 'readonly',
        calculateResult: 'readonly',
        toggleTheme: 'readonly'
      }
    },

    rules: {
      'no-unused-vars': 'warn',
      'eqeqeq': 'error',
      'semi': ['error', 'always']
    }
  },

  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        console: 'readonly'
      }
    }
  }
];