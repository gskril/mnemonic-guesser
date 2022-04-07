module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: false,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    'no-console': 0,
  },
};
