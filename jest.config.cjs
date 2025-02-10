module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    TextEncoder: require('util').TextEncoder,
    TextDecoder: require('util').TextDecoder,
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      lines: 70,
      statements: 70,
      functions: 70,
      branches: 70,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '.*\\.test\\.tsx',
    '.*\\.spec\\.tsx',
    'src/__tests__/setup.ts',
    'src/App.tsx',
  ],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['**/*.tsx'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testMatch: ['**/__tests__/**/*.test.tsx'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Мокинг CSS
  },
};
