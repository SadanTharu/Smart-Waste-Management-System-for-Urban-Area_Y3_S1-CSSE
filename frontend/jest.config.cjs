module.exports = {
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX files using Babel
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'], // File extensions Jest will look for
  testPathIgnorePatterns: ['/node_modules/', '/build/'], // Ignore these paths during testing
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js', // Mock CSS and less files
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Include setup file for additional matchers
};
