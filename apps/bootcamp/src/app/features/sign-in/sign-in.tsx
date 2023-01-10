/* eslint-disable react/jsx-props-no-spreading */
import {
	Box,
	Stack,
	TextField,
	PasswordField,
	Inline,
	Button,
} from '@bootcamp-nx/core-ui'
import { useAuthForm } from './use-auth-form'

// 'この項目は必須です' required
// パスワード min length

export default function SignInForm() {
	const { handleSubmit } = useAuthForm()

	return (
		<Box as='form' onSubmit={handleSubmit}>
			<Stack space='xlarge'>
				<Stack space='medium'>
					<TextField label='ユーザー名' name='username' />
					<PasswordField label='パスワード' name='password' />
				</Stack>
				<Inline>
					<Button type='submit'>サインイン</Button>
				</Inline>
			</Stack>
		</Box>
	)
}
