import { ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { FormEvent } from 'react'
import { useAppDispatch } from '../../store-hooks'
import { signUp } from './sign-up.actions'

type SignUpFormState = {
	repeatPassword: string
	agreement?: 'on'
} & ApiSignUp

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

			const { repeatPassword, agreement, ...signUpDto } = formResult

			dispatch(signUp(signUpDto))
		},
	}
}
