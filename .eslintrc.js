module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['yoctol-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  env: {
    browser: true,
    node: true,
    jest: true,
    jasmine: true,
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-undef': 'off',
    'prefer-destructuring': 'off',

    camelcase: 'warn',

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
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'off',

    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
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
      globals: {
        MessengerExtensions: true,
      },
    },
    {
      files: ['packages/**/__tests__/**/*.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['packages/**/*.ts'],
      rules: {
        'tsdoc/syntax': 'warn',
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
};
