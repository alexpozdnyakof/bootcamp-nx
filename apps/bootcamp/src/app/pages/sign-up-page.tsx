import { Box, Heading, Stack } from '@bootcamp-nx/core-ui'
import { SignUpForm } from '../features/sign-up'

export default function SignUpPage() {
	return (
		<Box
			width='full'
			height='full'
			style={{ height: '100vh' }}
			display='flex'
			alignItems='center'
			justifyContent='center'
		>
			<Box width='small' alignItems='center'>
				<Stack space='xxlarge'>
					<Heading level='1'>ブートキャンプに申し込む</Heading>
					<SignUpForm />
				</Stack>
			</Box>
		</Box>
	)
}
