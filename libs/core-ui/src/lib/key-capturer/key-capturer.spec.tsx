import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import KeyCapturer from './key-capturer'

describe('KeyCapturer', () => {
	it('should capture arrow down and cancel event', async () => {
		const bubbleSpy = jest.fn()
		const spy = jest.fn()

		render(
			<div onKeyDown={bubbleSpy}>
				<KeyCapturer eventName='onKeyDown' onArrowDown={spy}>
					<input type='text' />
				</KeyCapturer>
			</div>
		)

		await userEvent.type(screen.getByRole('textbox'), '{down}')

		expect(spy).toHaveBeenCalledTimes(1)
		expect(bubbleSpy).not.toHaveBeenCalled()
	})

	it('should noy capture event when propagate setted', async () => {
		const bubbleSpy = jest.fn()
		const spy = jest.fn()

		render(
			<div onKeyDown={bubbleSpy}>
				<KeyCapturer
					eventName='onKeyDown'
					onArrowDown={spy}
					propagateArrowDown
				>
					<input type='text' />
				</KeyCapturer>
			</div>
		)

		await userEvent.type(screen.getByRole('textbox'), '{down}')

		expect(spy).toHaveBeenCalledTimes(1)
		expect(bubbleSpy).toHaveBeenCalledTimes(1)
	})
})
