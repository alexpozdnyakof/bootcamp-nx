import {
	Box,
	Button,
	Inline,
	PasswordField,
	Stack,
	TextField,
} from '@bootcamp-nx/core-ui'
import useSignUp from './use-sign-up'

export default function SignUpForm() {
	const { handleSubmit } = useSignUp()
	return (
		<Box as='form' noValidate onSubmit={handleSubmit}>
			<Stack space='xlarge'>
				<Stack space='large'>
					<TextField label='ユーザー名' name='username' />
					<PasswordField label='パスワード' name='password' />
					<PasswordField
						label='パスワードを再度入力してください'
						name='repeat-password'
					/>
				</Stack>
				<Inline>
					<Button type='submit'>サインアップ</Button>
				</Inline>
			</Stack>
		</Box>
	)
}
