module.exports = [
  {
    files: ['**/*.js .css .html'],
    languageOptions: {
      globals: {
        window: false,
        document: false,
        console: false,
        process: false,
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
    },
  },
];


