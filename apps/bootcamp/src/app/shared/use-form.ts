import { useState, FormEvent } from 'react'

function validateForm<T extends object>(
	collection: HTMLFormControlsCollection,
	schema: T
): T {
	return Array.from(collection)
		.filter(
			(element): element is HTMLInputElement =>
				'name' in element &&
				typeof element.name === 'string' &&
				element.name in schema
		)
		.reduce((acc, textfield) => {
			const { name, validity, validationMessage } = textfield
			return {
				...acc,
				[name]: validity.valid ? null : validationMessage,
			}
		}, {} as T)
}

export type SubmitFn<T> = (state: T) => void

export function useForm<T extends object>(formState: T) {
	const [errors, setErrors] = useState<T>(formState)

	return {
		handleSubmit<S>(fn: SubmitFn<S>) {
			return (event: FormEvent) => {
				event.preventDefault()
				const form = event.target as HTMLFormElement
				const isValid = form.checkValidity()

				setErrors(validateForm(form.elements, errors))

				const formData = new FormData(form)
				const formResult = Object.fromEntries(formData.entries()) as S

				if (isValid) {
					fn(formResult)
				}
			}
		},
		errors,
	}
}

// type ControlValidity = ValidityState
// const errorsMap: Partial<Record<keyof ValidityState, string>> = {
//   typeMismatch: '無効なメールアドレス',
//   valueMissing: 'このフィールドを記入してください'
// }

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
