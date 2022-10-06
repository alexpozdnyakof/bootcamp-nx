import Heading from './heading'

export default {
	title: 'Design system/Heading',
	component: Heading,
	parameters: {
		badges: ['accessible'],
	},
}

export function HeadingStory() {
	return (
		<section className='story'>
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

			<Heading level={4} size='largest'>
				Heading level 4 / 5 / 6, largest
			</Heading>
			<Heading level={4} size='larger'>
				Heading level 4 / 5 / 6, larger
			</Heading>
			<Heading level={4}>Heading level 4 / 5 / 6</Heading>
		</section>
	)
}
