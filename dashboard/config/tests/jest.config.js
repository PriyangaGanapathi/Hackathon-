/* eslint-disable max-len */
// https://jestjs.io/docs/en/configuration.html
module.exports = {
    rootDir: '../../',

    //babel-jest will be automatically installed during the jest install
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],

    // The directory where Jest should output its coverage files
    coverageDirectory: '<rootDir>/coverage',

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'jsx', 'json'],
    
    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: ['<rootDir>/config/tests/setup.test.js'],
    
    setupFilesAfterEnv: ['<rootDir>/config/tests/enzyme.config.js'],

    // The test environment that will be used for testing
    testEnvironment: 'jest-environment-jsdom-fifteen',

    // The glob patterns Jest uses to detect test files
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
        '<rootDir>/src/**/*.{spec,test}.{js,jsx}',
    ],

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['<rootDir>/node_modules/'],

    // Indicates whether each individual test should be reported during the run
    verbose: true,
};
