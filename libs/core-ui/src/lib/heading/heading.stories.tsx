import { Stack } from '../stack'
import {
	ResponsiveWidthRef,
	select,
	selectWithNone,
} from '../storybook-helpers'
import Heading from './heading'

export default {
	title: 'Design system/Heading',
	component: Heading,
	parameters: {
		badges: ['accessible'],
	},
}

export function Overview() {
	return (
		<section className='story'>
			<Stack space='medium'>
				<Stack space='small'>
					<Heading level={1} size='largest'>
						Heading level 1, largest
					</Heading>
					<Heading level={1} size='larger'>
						Heading level 1, larger
					</Heading>
					<Heading level={1}>Heading level 1</Heading>
					<Heading level={1} size='smaller'>
						Heading level 1, smaller
					</Heading>
				</Stack>

				<Stack space='small'>
					<Heading level={2} size='largest'>
						Heading level 2, largest
					</Heading>
					<Heading level={2} size='larger'>
						Heading level 2, larger
					</Heading>
					<Heading level={2}>Heading level 2</Heading>
					<Heading level={2} size='smaller'>
						Heading level 2, smaller
					</Heading>
				</Stack>

				<Stack space='small'>
					<Heading level={3} size='largest'>
						Heading level 3, largest
					</Heading>
					<Heading level={3} size='larger'>
						Heading level 3, larger
					</Heading>
					<Heading level={3}>Heading level 3</Heading>
					<Heading level={3} size='smaller'>
						Heading level 3, smaller
					</Heading>
				</Stack>

				<Stack space='small'>
					<Heading level={4} size='largest'>
						Heading level 4 / 5 / 6, largest
					</Heading>
					<Heading level={4} size='larger'>
						Heading level 4 / 5 / 6, larger
					</Heading>
					<Heading level={4}>Heading level 4 / 5 / 6</Heading>
				</Stack>
			</Stack>
		</section>
	)
}

export function Responsive(props: React.ComponentProps<typeof Heading>) {
	return (
		<>
			<ResponsiveWidthRef />
			<Heading
				{...props}
				align={{ mobile: 'end', tablet: 'center', desktop: 'start' }}
			/>
		</>
	)
}

Responsive.argTypes = {
	level: select(['1', '2', '3', '4', '5', '6'], '1'),
	size: selectWithNone(['largest', 'larger', 'smaller'], 'none'),
	tone: select(['normal', 'secondary', 'danger', 'positive'], 'positive'),
	align: { control: false },
	children: {
		control: { type: 'text' },
		defaultValue:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit',
	},
}

export function Playground(props: React.ComponentProps<typeof Heading>) {
	return (
		<section className='story playground'>
			<Heading {...props} />
		</section>
	)
}

Playground.argTypes = {
	level: select(['1', '2', '3', '4', '5', '6'], '1'),
	size: selectWithNone(['largest', 'larger', 'smaller'], 'none'),
	lineClamp: selectWithNone([1, 2, 3, 4, 5], 'none'),
	tone: select(['normal', 'secondary', 'danger', 'positive'], 'normal'),
	align: selectWithNone(['start', 'center', 'end', 'justify'], 'none'),
	children: {
		control: { type: 'text' },
		defaultValue:
			'Lorem ipsum dolor, sit amet consectetur adipisicing elit',
	},
}
