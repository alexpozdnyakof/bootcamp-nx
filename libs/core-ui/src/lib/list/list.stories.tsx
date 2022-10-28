import { Button } from '../button'
import { Text } from '../text'
import { List, ListItem } from './list'

export default {
	component: List,
	title: 'List',
}

const items = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
const itemsJp = [
	'零一三',
	'四五六',
	'七八九',
	'二,十,卄',
	'卄, 廾, 廿',
	'三十, 卅, 丗',
]

export function Overview() {
	return (
		<List>
			{itemsJp.map(item => (
				<ListItem
					key={item}
					actions={
						<Button
							size='small'
							tone='destructive'
							variant='quaternary'
						>
							Delete
						</Button>
					}
				>
					<Text size='body' weight='bold'>
						{item}
					</Text>
				</ListItem>
			))}
		</List>
	)
}
