module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'linebreak-style': 0,
    'no-console': 'off',
  },

};
