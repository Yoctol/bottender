module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'yoctol-base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
    jasmine: true,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'prefer-destructuring': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    '@typescript-eslint/camelcase': 'off',
  },
  overrides: [
    {
      files: ['examples/**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  globals: {
    MessengerExtensions: true,
  },
};
