import { FormEvent } from 'react'
import { useAppDispatch } from '../../store-hooks'
import { signUp } from './sign-up.actions'

type SignUpFormState = {
	username: string
	password: string
	repeatPassword: string
}

export default function useSignUp() {
	const dispatch = useAppDispatch()

	return {
		handleSubmit(event: FormEvent) {
			event.preventDefault()
			const formElement = event.target as HTMLFormElement
			const formData = new FormData(formElement)
			const formResult = Object.fromEntries(
				formData.entries()
			) as SignUpFormState

			const { username, password } = formResult

			dispatch(signUp({ username, password }))
		},
	}
}
