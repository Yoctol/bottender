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
    'import/extensions': 'off',
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
  },
  overrides: [
    {
      files: [
        'examples/**/*.js',
        'packages/create-bottender-app/template/**/*.js',
      ],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['packages/**/__tests__/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  globals: {
    MessengerExtensions: true,
  },
};
