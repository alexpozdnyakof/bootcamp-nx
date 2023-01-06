import { createRef, RefObject, useRef } from 'react'

type ControlError = {
	type: string
	message: string
}

type ValidatorFn = <T>(value: T) => ControlError | undefined
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

	// const validate = (formValue: Record<string, unknown>) => {
	//   const entries = Object.entries(formValue)
	//   entries.reduce((acc, [name, value]) => {

	//   })

	// }

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
			fn(value())
		},
	}
}
