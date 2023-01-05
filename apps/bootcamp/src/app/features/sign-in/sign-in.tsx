import {
	Box,
	Stack,
	TextField,
	PasswordField,
	Inline,
	Button,
} from '@bootcamp-nx/core-ui'

export default function SignInForm() {
	return (
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
	)
}
