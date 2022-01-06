export default {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '/packages/.*.test.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverageFrom: ['packages/**/*.tsx', 'packages/**/*.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
