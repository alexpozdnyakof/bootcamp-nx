import { Button } from '../button'
import { Text } from '../text'
import { Icon } from '../icon'
import List from './list'
import { ListItem } from '../list-item'

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
		<List>
			{itemsJp.map(item => (
				<ListItem
					key={item}
					actions={
						<Button size='small' variant='quaternary'>
							<Icon size='small'>delete</Icon>
						</Button>
					}
				>
					<Text size='body'>{item}</Text>
				</ListItem>
			))}
		</List>
	)
}
