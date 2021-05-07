module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    ecmaVersion: 2018,
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
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
  settings: {
    react: {
      version: "detect"
    }
  }
};
