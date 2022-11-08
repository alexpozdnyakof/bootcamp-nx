import { Button } from '../button'
import { Text } from '../text'
import { Icon } from '../icon'
import List from './list'
import { ListItem } from '../list-item'
import { Box } from '../box'

export default {
	component: List,
	title: 'List',
}

const itemsJp = [
	'零一三 二,十,卄',
	'卄, 廾, 廿 四五六',
	'七八九 三十, 卅, 丗',
	'二,十,卄 三 二,十',
	'卄, 廾, 廿 七八九',
	'三十, 卅, 丗',
]

export function Overview() {
	return (
		<Box marginLeft='xlarge'>
			<List>
				{itemsJp.map(item => (
					<ListItem
						key={item}
						startActions={
							<Icon size='small' tone='secondary'>
								drag_indicator
							</Icon>
						}
						actions={
							<Button size='small' variant='quaternary'>
								<Icon size='small'>delete</Icon>
							</Button>
						}
					>
						<Text size='caption'>{item}</Text>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
