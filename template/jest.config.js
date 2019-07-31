const JestExcludeSrc = require('./.scripts/utils/jest-exclude-src');

module.exports = {

	collectCoverage: true,

	coverageDirectory: "coverage",

	moduleFileExtensions: [
		"js",
		"json",
		"jsx",
		"ts",
		"tsx",
		"node"
	],

	moduleNameMapper: {
		"\\.s?[ca]ss$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": JestExcludeSrc
	},

	rootDir: '.',

	roots: [
		"<rootDir>"
	],

	setupFilesAfterEnv: ["<rootDir>/.scripts/utils/jest-global.js"],

	testEnvironment: "jsdom",

	testMatch: [
		"**/__tests__/**/*.[jt]s?(x)",
		"**/?(*.)+(spec|test).[tj]s?(x)"
	],

	"transform": {
		"^.+\\.[jt]sx?$": "babel-jest"
	},

	transformIgnorePatterns: [
		"\\\\node_modules\\\\"
	],
};
