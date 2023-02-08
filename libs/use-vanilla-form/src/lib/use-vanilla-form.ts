import { createRef, FormEvent, RefObject, useRef, useState } from 'react'
import { mapValues } from './map-values'

type FieldValue = string | number | Date | undefined

type FormResult = {
	[controlName: string]: FieldValue
}

type State<T> = {
	[K in keyof T]: RefObject<HTMLInputElement | HTMLTextAreaElement>
}

type Errors<T> = {
	[K in keyof T]: null | string
}

type ControlOptions = {
	required?: boolean
	pattern?: string
	min?: number
	max?: number
	step?: string
	maxLength?: number
	minLength?: number
}
export type SubmitFn<T extends FormResult> = (state: T) => void

/**
 * React Hook for validation forms
 */
export default function useVanillaForm<T extends FormResult>() {
	const state = useRef({} as State<T>)
	const [errors, setErrors] = useState({} as Errors<T>)
	const resetErrors = () => {
		setErrors({} as Errors<T>)
	}

	return {
		formControl(name: keyof T, options?: ControlOptions) {
			const ref = createRef<HTMLInputElement>()
			state.current[name] = ref
			return {
				name,
				ref,
				...options,
			}
		},
		handleSubmit(fn: SubmitFn<T>) {
			return (event: FormEvent) => {
				event.preventDefault()
				const form = event.target as HTMLFormElement
				const isValid = form.checkValidity()

				if (!isValid) {
					setErrors(getFormErrors<T>(state.current))
				} else {
					fn(getFormValue<T>(state.current))
				}
			}
		},
		errors,
		resetErrors,
	}
}

function getFormErrors<T extends object>(state: State<T>): Errors<T> {
	return mapValues(state, ref => {
		const { validity, validationMessage } = ref.current as HTMLInputElement
		return validity.valid ? null : validationMessage
	})
}

function getFormValue<T>(state: State<T>) {
	return mapValues(state, ref => {
		const field = ref.current as HTMLInputElement
		return field.value
	}) as T
}

// const errorsMap: Partial<Record<keyof ValidityState, string>> = {
//   typeMismatch: '無効なメールアドレス',
//   valueMissing: 'このフィールドを記入してください'
// }
