module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  testMatch: [
    '**/__tests__/**/*.(test|spec).(ts|js)',
    '**/?(*.)+(spec|test).(ts|js)',
  ],
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
  },
};
