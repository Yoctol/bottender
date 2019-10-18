module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/examples/',
    '/dist/',
    'src/cli/providers/sh/test.js',
  ],
  coverageDirectory: './coverage/',
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/*.ts'],
  timers: 'fake',
  resetMocks: true,
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.test.json',
      diagnostics: false,
    },
  },
  collectCoverageFrom: ['packages/*/src/**/*.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  setupFiles: ['./test/setupJest.js'],
  reporters: ['default', 'jest-junit'],
  resetModules: true,
};
