/* eslint-disable */
export default {
	displayName: 'core-ui',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': 'babel-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/core-ui',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}
