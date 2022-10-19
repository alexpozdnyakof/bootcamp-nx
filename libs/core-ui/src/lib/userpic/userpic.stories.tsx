import { Box } from '../box'
import { Inline } from '../inline'
import Userpic from './userpic'

export default {
	title: 'Content/Userpic',
	component: Userpic,
}

const data = [
	{
		size: 'xxs',
		user: { name: 'Henry Jackson', email: 'henryjackson@mmail.com' },
		image: 'https://randomuser.me/api/portraits/men/35.jpg',
	},
	{
		size: 'xs',
		user: { name: 'Jolanda James', email: 'jolanda@mmail.com' },
		image: 'https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
	},
	{
		size: 's',
		user: { name: 'Rober Rodriges', email: 'rodriges@mmail.com' },
		image: 'https://randomuser.me/api/portraits/men/22.jpg',
	},
	{
		size: 'm',
		user: { name: 'Alex Chen', email: 'alex@mmail.com' },
		image: 'https://randomuser.me/api/portraits/men/4.jpg',
	},
	{
		size: 'l',
		user: { name: 'Julietta Malkova', email: 'juliett@mmail.com' },
		image: 'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
	},
	{
		size: 'xl',
		user: { name: 'Hans', email: 'jefferson@mmail.com' },
		image: 'https://randomuser.me/api/portraits/men/16.jpg',
	},
	{
		size: 'xxl',
		user: { name: 'Jaime Arnold', email: 'jaimearnold@mmail.com' },
		image: 'https://images.unsplash.com/photo-1503593245033-a040be3f3c82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=ca8c652b62b1f14c9c4c969289a8b33c',
	},
	{
		size: 'xxxl',
		user: { name: 'Sandy', email: 'sandy@mmail.com' },
		image: 'https://images.unsplash.com/photo-1496081081095-d32308dd6206?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=dd302358c7e18c27c4086e97caf85781',
	},
] as const

export const InitialsUserpicStory = () => (
	<Inline space='small'>
		{data.map((data, index) => (
			<Userpic key={index} size={data.size} user={data.user} />
		))}
	</Inline>
)

export const PictureUserpicStory = () => (
	<Inline space='small'>
		{data.map((data, index) => (
			<Userpic
				key={index}
				size={data.size}
				user={data.user}
				imageUrl={data.image}
			/>
		))}
	</Inline>
)

export const UserpicPlaygroundStory = args => {
	return (
		<Box>
			<Userpic
				{...args}
				user={{
					name: args.userName,
					email: args.email,
				}}
			/>
		</Box>
	)
}

UserpicPlaygroundStory.args = {
	size: 'l',
	imageUrl:
		'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e',
	userName: '',
	email: '',
}

UserpicPlaygroundStory.argTypes = {
	size: {
		type: 'select',
		options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
	},
	imageUrl: {
		control: {
			type: 'text',
		},
	},
	userName: {
		control: {
			type: 'text',
		},
	},
	email: {
		control: {
			type: 'text',
		},
	},
	user: {
		control: {
			type: null,
		},
	},
}
