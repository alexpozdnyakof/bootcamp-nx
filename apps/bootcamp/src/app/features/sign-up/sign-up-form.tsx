import {
	Box,
	Button,
	Checkbox,
	Inline,
	PasswordField,
	Stack,
	TextField,
	Text,
} from '@bootcamp-nx/core-ui'
import { FormEvent } from 'react'
import { useAuth } from '../../process/auth'
import { useForm } from '../../shared'

type SignUpFormState = {
	username: string
	first_name: string
	last_name: string
	birthdate: string
	password: string
	repeatPassword: string
	agreement: string
}

export default function SignUpForm() {
	const { signUp } = useAuth()
	const { handleSubmit, errors } = useForm({
		username: null,
		first_name: null,
		last_name: null,
		birthdate: null,
		password: null,
		repeatPassword: null,
		agreement: null,
	})

	function submitFn(state: SignUpFormState) {
		const { repeatPassword, agreement, ...signUpDto } = state
		signUp(signUpDto)
	}

	return (
		<Box
			as='form'
			noValidate
			onSubmit={(event: FormEvent) => handleSubmit(submitFn)(event)}
		>
			<Stack space='xlarge'>
				<Stack space='large' maxWidth='full'>
					<TextField
						label='ユーザー名'
						name='username'
						required
						autoFocus
						type='email'
						tone={errors.username ? 'error' : 'neutral'}
						message={errors.username}
					/>
					<Inline space='medium'>
						<TextField
							label='ファーストネーム'
							name='first_name'
							maxWidth='full'
							required
							tone={errors.first_name ? 'error' : 'neutral'}
							message={errors.first_name}
						/>
						<TextField
							label='苗字'
							name='last_name'
							maxWidth='full'
							required
							tone={errors.last_name ? 'error' : 'neutral'}
							message={errors.last_name}
						/>
					</Inline>
					<TextField
						label='誕生日'
						name='birthdate'
						required
						tone={errors.birthdate ? 'error' : 'neutral'}
						message={errors.birthdate}
					/>
					<PasswordField
						label='パスワード'
						name='password'
						required
						tone={errors.password ? 'error' : 'neutral'}
						message={errors.password}
					/>
					<PasswordField
						label='パスワードを再度入力してください'
						name='repeatPassword'
						required
						tone={errors.repeatPassword ? 'error' : 'neutral'}
						message={errors.repeatPassword}
					/>
					<Stack space='small'>
						<Checkbox
							id='agreement'
							name='agreement'
							label='ルールに同意する'
							required
						/>
						<Text tone='danger'>{errors.agreement}</Text>
					</Stack>
				</Stack>
				<Inline>
					<Button type='submit'>サインアップ</Button>
				</Inline>
			</Stack>
		</Box>
	)
}
