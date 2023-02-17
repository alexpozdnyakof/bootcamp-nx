/* eslint-disable react/jsx-props-no-spreading */
import {
	Box,
	Button,
	Heading,
	Inline,
	PasswordField,
	Stack,
	TextField,
} from '@bootcamp-nx/core-ui'
import { useVanillaForm } from '@bootcamp-nx/use-vanilla-form'
import { observer } from 'mobx-react-lite'
import { FormEvent } from 'react'
import { useStore } from '../../stores'

type SignInFormState = {
	username: string
	password: string
}

const SignInForm = observer(() => {
	const { handleSubmit, errors, formControl } =
		useVanillaForm<SignInFormState>()

	const { authStore } = useStore()

	function submitFn(state: SignInFormState) {
		authStore.signIn(state)
	}

	return (
		<Box
			as='form'
			noValidate
			onSubmit={(event: FormEvent) => handleSubmit(submitFn)(event)}
		>
			<Stack space='xxlarge'>
				<Heading level='1'>ブートキャンプにサインインする</Heading>
				<Stack space='xlarge'>
					<Stack space='medium'>
						<TextField
							label='ユーザー名'
							autoFocus
							type='email'
							{...formControl('username', { required: true })}
							tone={errors.username ? 'error' : 'neutral'}
							message={errors.username}
							hint='ブートキャンプにサインインする'
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
			</Stack>
		</Box>
	)
})

export default SignInForm
