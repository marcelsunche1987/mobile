module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['\\.snap$', '<rootDir>/node_modules/'],
  transformIgnorePatterns: ['node_modules/?!(static-container)'],
  transform: {
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
};
