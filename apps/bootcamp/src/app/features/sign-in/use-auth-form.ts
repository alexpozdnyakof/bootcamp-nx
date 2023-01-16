import { FormEvent } from 'react'
import { useAuth } from '../../process/auth'

// type FormState = {
// 	[controlName: string]: {
// 		ref: RefObject<HTMLInputElement>
// 	}
// }
// export function useAuthForm() {
// 	const state = useRef<FormState>({})

// 	return {
// 		register(name: string) {
// 			const fieldRef = createRef<HTMLInputElement>()

// 			state.current[name] = {
// 				ref: fieldRef,
// 			}

// 			return {
// 				name,
// 				ref: fieldRef,
// 			}
// 		},
// 	}
// }

export type SubmitFn<T> = (state: T) => void

export function useAuthForm() {
	const { signIn } = useAuth()

	return {
		handleSubmit(event: FormEvent) {
			event.preventDefault()
			const formElement = event.target as HTMLFormElement
			const formData = new FormData(formElement)
			const formResult = Object.fromEntries(formData.entries()) as {
				username: string
				password: string
			}

			signIn({ ...formResult })
		},
	}
}
