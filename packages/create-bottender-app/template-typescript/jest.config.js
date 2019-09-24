module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.ts',
    '<rootDir>/**/*.{spec,test}.ts',
  ],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      diagnostics: false,
    },
  },
};
