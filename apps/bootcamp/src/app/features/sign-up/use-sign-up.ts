import { ApiSignUp } from '@bootcamp-nx/api-interfaces'
import { FormEvent } from 'react'
import { useAuth } from '../../process/auth'

type SignUpFormState = {
	repeatPassword: string
	agreement?: 'on'
} & ApiSignUp

export default function useSignUpForm() {
	const { signUp } = useAuth()

	return {
		handleSubmit(event: FormEvent) {
			event.preventDefault()
			const formElement = event.target as HTMLFormElement
			const formData = new FormData(formElement)
			const formResult = Object.fromEntries(
				formData.entries()
			) as SignUpFormState

			const { repeatPassword, agreement, ...signUpDto } = formResult

			signUp(signUpDto)
		},
	}
}
