import {
	Box,
	Button,
	PasswordField,
	Stack,
	TextField,
	Heading,
	Inline,
} from '@bootcamp-nx/core-ui'

export default function SignInPage() {
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
					<Heading level='1'>ブートキャンプにサインインする</Heading>
					<Box as='form'>
						<Stack space='xlarge'>
							<Stack space='medium'>
								<TextField label='ユーザー名' />
								<PasswordField label='パスワード' />
							</Stack>
							<Inline>
								<Button>サインイン</Button>
							</Inline>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</Box>
	)
}
