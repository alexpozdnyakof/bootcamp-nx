import { createRef, RefObject, useRef, useState } from 'react'

type ValidationError = {
	type: string
	message: string
}

type ValidatorFn = <T>(value: T) => ValidationError | undefined
type SubmitFn = (value: Record<string, unknown>) => void
type Control = {
	ref: RefObject<HTMLInputElement>
	validators: Array<ValidatorFn>
}

type FormState = {
	controls: {
		[controlName: string]: Control
	}
}

type ValidationResult = {
	[controlName: string]: Array<ValidationError>
}

/**
 * Hook for validation forms
 * @returns
 */

export default function useForm() {
	const state = useRef<FormState>({ controls: {} })
	const [errors, setErrors] = useState<ValidationResult>({})

	const value = () =>
		Object.entries(state.current.controls).reduce(
			(acc, [name, field]) =>
				Object.assign(acc, {
					[name]: field.ref.current?.value,
				}),
			{}
		)

	const validate = (formValue: Record<string, unknown>) => {
		const values: Array<[keyof FormState['controls'], unknown]> =
			Object.entries(formValue)

		const { controls } = state.current

		const result = values.reduce((acc, entry) => {
			const [name, value] = entry

			const validationResult = controls[name].validators
				.map((validatorFn): ValidationError | undefined =>
					validatorFn(value)
				)
				.filter(
					(error): error is ValidationError =>
						typeof error !== 'undefined'
				)

			if (validationResult.length > 0) {
				acc[name] = validationResult
			}

			return acc
		}, {} as ValidationResult)

		return result
	}

	return {
		register(name: string, validators?: Array<ValidatorFn>) {
			state.current.controls[name] = {
				ref: createRef(),
				validators: validators ?? [],
			}

			return {
				name,
				ref: state.current.controls[name].ref,
			}
		},
		handleSumbit(fn: SubmitFn) {
			const result = value()
			const formErrors = validate(result)
			const valid = Object.keys(formErrors).length === 0
			if (valid) {
				fn(value())
			} else {
				setErrors(formErrors)
			}
		},
		errors,
	}
}

export function required(value: unknown): ValidationError | undefined {
	const emptyString = (value: unknown) =>
		typeof value == 'string' && value.length === 0
	if (typeof value == 'undefined' || value == null || emptyString(value))
		return {
			type: 'required',
			message: 'この項目は必須です',
		}

	return undefined
}

export function minLength(
	min: number
): (value: unknown) => ValidationError | undefined {
	return (value: unknown) => {
		if (
			isEmptyValue(value) ||
			isEmptyValue(min) ||
			typeof value !== 'string'
		) {
			return undefined
		}

		return value.length < min
			? {
					type: 'minLength',
					message: `最小の長さは ${min}`,
			  }
			: undefined
	}
}

function isEmptyValue(value: unknown): boolean {
	return (
		value == null ||
		typeof value == 'string' ||
		(Array.isArray(value) && value.length === 0)
	)
}
