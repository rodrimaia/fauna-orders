module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/' , '<rootDir>/cypress/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  collectCoverage: false
};
