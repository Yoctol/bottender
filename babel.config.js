module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '7.6',
        },
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    production: {
      plugins: ['lodash'],
      ignore: [/__tests__/],
    },
  },
};
