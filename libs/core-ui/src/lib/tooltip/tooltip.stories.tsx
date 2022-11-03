import { Button } from '../button'
import { PartialProps } from '../storybook-helpers'
import Tooltip from './tooltip'

export default {
	component: Tooltip,
	title: 'Tooltip',
}

export function Interactive(props: PartialProps<typeof Tooltip>) {
	return (
		<div style={{ width: '600px', height: '300px' }}>
			<Tooltip>
				<Button style={{ marginLeft: '100px', marginTop: '30px' }}>
					私を指して
				</Button>
			</Tooltip>
		</div>
	)
}
