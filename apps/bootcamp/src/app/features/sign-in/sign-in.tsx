/* eslint-disable react/jsx-props-no-spreading */
import {
	Box,
	Stack,
	TextField,
	PasswordField,
	Inline,
	Button,
} from '@bootcamp-nx/core-ui'
import { useVanillaForm } from '@bootcamp-nx/use-vanilla-form'
import { FormEvent } from 'react'
import { useAuth } from '../../process/auth'

type SignInFormState = {
	username: string
	password: string
}

export default function SignInForm() {
	const { signIn } = useAuth()
	const { handleSubmit, errors, formControl } =
		useVanillaForm<SignInFormState>()

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
						autoFocus
						type='email'
						{...formControl('username', { required: true })}
						tone={errors.username ? 'error' : 'neutral'}
						message={errors.username}
					/>
					<PasswordField
						label='パスワード'
						{...formControl('password', {
							required: true,
							minLength: 8,
						})}
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
