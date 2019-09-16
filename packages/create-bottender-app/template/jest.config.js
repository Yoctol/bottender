module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '<rootDir>/**/__tests__/**/*.js',
    '<rootDir>/**/*.{spec,test}.js',
  ],
};
