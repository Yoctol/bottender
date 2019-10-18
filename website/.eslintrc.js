module.exports = {
  root: true,
  extends: ['yoctol', 'prettier'],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'react/prop-types': 'off',
  },
};
