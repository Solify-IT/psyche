module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['**/migration/*.ts'],
  rules: {
    'class-methods-use-this': 'off',
    'linebreak-style': 0,
    'import/no-cycle': 'off',
  },

};
