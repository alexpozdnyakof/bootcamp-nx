/* eslint-disable react/jsx-props-no-spreading */
import {
	Box,
	Stack,
	TextField,
	PasswordField,
	Inline,
	Button,
} from '@bootcamp-nx/core-ui'
import { FormEvent } from 'react'
import { useAuth } from '../../process/auth'
import { useForm } from '../../shared'

type SignInFormState = {
	username: string
	password: string
}

export default function SignInForm() {
	const { signIn } = useAuth()
	const { handleSubmit, errors } = useForm({
		username: null,
		password: null,
	})
	function submitFn(state: SignInFormState) {
		signIn(state)
	}

	return (
		<Box
			as='form'
			noValidate
			onSubmit={(event: FormEvent) => handleSubmit(submitFn)(event)}
		>
			<Stack space='xlarge'>
				<Stack space='medium'>
					<TextField
						label='ユーザー名'
						name='username'
						required
						autoFocus
						type='email'
						tone={errors.username ? 'error' : 'neutral'}
						message={errors.username}
					/>
					<PasswordField
						label='パスワード'
						name='password'
						required
						tone={errors.password ? 'error' : 'neutral'}
						message={errors.password}
					/>
				</Stack>
				<Inline>
					<Button type='submit'>サインイン</Button>
				</Inline>
			</Stack>
		</Box>
	)
}
