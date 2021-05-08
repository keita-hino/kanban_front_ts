module.exports = {
  moduleFileExtensions: [
    "js",
    "ts",
    "json",
    "vue"
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  transform: {
    ".*\\.(vue)$": "vue-jest",
    "^.+\\.ts?$": "ts-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  setupFiles: ["./src/tests/unit/setup.ts"]
};