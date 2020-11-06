module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'object-shorthand': 'off',
    'no-extra-boolean-cast': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'spaced-comment': 'off',
    'consistent-return': 'off',
  },
};
