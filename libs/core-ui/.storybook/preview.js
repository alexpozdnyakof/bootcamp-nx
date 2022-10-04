import '../src/lib/styles.less'
import { useDarkMode } from 'storybook-dark-mode'

import { DocsContainer } from './docs-container'

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	viewMode: 'docs',
	docs: {
		// theme: themes.dark,
		container: DocsContainer,
	},
}

export const decorators = [
	Story => (
		<div className={useDarkMode() ? 'bootcamp-dark' : 'light'}>
			<Story />
		</div>
	),
]
