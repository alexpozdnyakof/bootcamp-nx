/* eslint-disable */
export default {
	displayName: 'tasks',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': [
			'@swc/jest',
			{ jsc: { transform: { react: { runtime: 'automatic' } } } },
		],
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	coverageDirectory: '../../coverage/libs/tasks',
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}
