/* eslint-disable */
export default {
	displayName: 'use-vanilla-form',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': [
			'@swc/jest',
			{ jsc: { transform: { react: { runtime: 'automatic' } } } },
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/use-vanilla-form',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}
