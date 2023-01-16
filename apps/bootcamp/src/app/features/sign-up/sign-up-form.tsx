import {
	Box,
	Button,
	Checkbox,
	Inline,
	PasswordField,
	Stack,
	TextField,
} from '@bootcamp-nx/core-ui'
import useSignUpForm from './use-sign-up'

export default function SignUpForm() {
	const { handleSubmit } = useSignUpForm()
	return (
		<Box as='form' noValidate onSubmit={handleSubmit}>
			<Stack space='xlarge'>
				<Stack space='large' maxWidth='full'>
					<TextField label='ユーザー名' name='username' />
					<Inline space='medium'>
						<TextField
							label='ファーストネーム'
							name='first_name'
							maxWidth='full'
						/>
						<TextField
							label='苗字'
							name='last_name'
							maxWidth='full'
						/>
					</Inline>
					<TextField label='誕生日' name='birthdate' />
					<PasswordField label='パスワード' name='password' />
					<PasswordField
						label='パスワードを再度入力してください'
						name='repeatPassword'
					/>
					<Checkbox
						id='agreement'
						name='agreement'
						label='ルールに同意する'
					/>
				</Stack>
				<Inline>
					<Button type='submit'>サインアップ</Button>
				</Inline>
			</Stack>
		</Box>
	)
}
