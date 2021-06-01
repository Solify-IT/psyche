module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    }
  },
  rules: {
    'class-methods-use-this': 'off',
    'linebreak-style': 0,
    'no-console': 'off',
  },
  env: {
    browser: true,
  },
  settings:  {
    react:  {
      version:  'detect',
    },
  },
};
