module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 5,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
};
