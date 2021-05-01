const path = require('path');
const { defaults } = require('jest-config');

module.exports = {
    ...defaults,
    roots: [
        process.cwd()
    ],
    modulePaths: [
        path.resolve(process.cwd(), 'src')
    ],
    testMatch: [
        path.resolve(process.cwd(), 'test/**/*.{test,Spec}.{js,jsx,ts,tsx}')
    ],
    moduleDirectories: [
        path.resolve(process.cwd(), 'node_modules'),
        path.resolve(process.cwd(), 'src')
    ],
    modulePathIgnorePatterns: [
        path.resolve(process.cwd(), '.yalc')
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    }
};
