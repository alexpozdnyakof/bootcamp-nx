import { createRef, RefObject, useRef } from 'react'



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

	const value = () =>
		Object.entries(state.current.controls).reduce(
			(acc, [name, field]) =>
				Object.assign(acc, {
					[name]: field.ref?.current?.value,
				}),
			{}
		)

	const validate = (formValue: Record<string, unknown>) => {
		const values: Array<[keyof FormState['controls'], unknown]> =
			Object.entries(formValue)
		/**
		 * {
		 *  name: value
		 * }
		 * [fn, fn, fn] ->  [error, undefined, error] -> [error, error]
		 *
		 */
		const { controls } = state.current

		const validateResult = values.reduce((acc, entry) => {
			const [name, value] = entry
			// Validate field: Extract this

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

		return validateResult
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
			}
		},
	}
}

/**
 * TODO: validate fields before submit
 * TODO: lock submit if form invalid
 * TODO: return fields errors
 */

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
