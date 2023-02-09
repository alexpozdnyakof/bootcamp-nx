/* eslint-disable react/jsx-props-no-spreading */
import {
	Box,
	Button,
	Checkbox,
	Inline,
	PasswordField,
	Stack,
	Text,
	TextField,
} from '@bootcamp-nx/core-ui'
import { useVanillaForm } from '@bootcamp-nx/use-vanilla-form'
import { FormEvent } from 'react'
import { signUpThunk } from '../../slices/auth.slice'
import { useAppDispatch } from '../../store-hooks'

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
	const dispatch = useAppDispatch()
	const { handleSubmit, errors, formControl } =
		useVanillaForm<SignUpFormState>()

	function submitFn(state: SignUpFormState) {
		const { repeatPassword, agreement, ...signUpDto } = state
		dispatch(signUpThunk(signUpDto))
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
						{...formControl('username', { required: true })}
						autoFocus
						type='email'
						tone={errors.username ? 'error' : 'neutral'}
						message={errors.username}
					/>
					<Inline space='medium'>
						<TextField
							label='ファーストネーム'
							maxWidth='full'
							{...formControl('first_name', { required: true })}
							tone={errors.first_name ? 'error' : 'neutral'}
							message={errors.first_name}
						/>
						<TextField
							label='苗字'
							maxWidth='full'
							{...formControl('last_name', { required: true })}
							tone={errors.last_name ? 'error' : 'neutral'}
							message={errors.last_name}
						/>
					</Inline>
					<TextField
						label='誕生日'
						{...formControl('birthdate', { required: true })}
						tone={errors.birthdate ? 'error' : 'neutral'}
						message={errors.birthdate}
					/>
					<PasswordField
						label='パスワード'
						{...formControl('password', { required: true })}
						tone={errors.password ? 'error' : 'neutral'}
						message={errors.password}
					/>
					<PasswordField
						label='パスワードを再度入力してください'
						{...formControl('repeatPassword', { required: true })}
						tone={errors.repeatPassword ? 'error' : 'neutral'}
						message={errors.repeatPassword}
					/>
					<Stack space='small'>
						<Checkbox
							id='agreement'
							label='ルールに同意する'
							{...formControl('agreement', { required: true })}
							aria-describedby='agreement-error'
						/>
						<Text tone='danger' id='agreement-error'>
							{errors.agreement}
						</Text>
					</Stack>
				</Stack>
				<Inline>
					<Button type='submit'>サインアップ</Button>
				</Inline>
			</Stack>
		</Box>
	)
}
