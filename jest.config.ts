import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-environment-jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  moduleDirectories: ['node_modules', 'src', __dirname],
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Adjust according to your project structure
  },
  // Enable coverage collection
  collectCoverage: true,

  // Specify which files to collect coverage from
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}', // Include all relevant files
    '!src/**/*.d.ts', // Exclude TypeScript declaration files
    '!src/**/index.{ts,tsx,js,jsx}', // Optionally exclude index files
  ],

  // Specify the output directory for coverage reports
  coverageDirectory: 'coverage',

  // Define coverage report formats
  coverageReporters: ['json', 'lcov', 'text', 'clover'],

  // Optionally, set coverage thresholds
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)