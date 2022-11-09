import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRef } from 'react'
import useOutsideClick from './use-outside-click'

describe('useOutsideClick', () => {
	const ComponentUnderTest = ({ callback }: { callback: () => void }) => {
		const buttonRef = useRef(null)
		useOutsideClick(buttonRef, callback)
		return (
			<>
				<button ref={buttonRef}>Inside</button>
				<button>Outside</button>
			</>
		)
	}
	it('should not call callback when clicked inside wrapped element', async () => {
		const outsideClickCallback = jest.fn()
		render(<ComponentUnderTest callback={outsideClickCallback} />)

		await userEvent.click(screen.getByRole('button', { name: 'Inside' }))

		expect(outsideClickCallback).not.toBeCalled()
	})

	it('should call callback when clicked outside wrapped element', async () => {
		const outsideClickCallback = jest.fn()
		render(<ComponentUnderTest callback={outsideClickCallback} />)

		await userEvent.click(screen.getByRole('button', { name: 'Outside' }))
		expect(outsideClickCallback).toBeCalledTimes(1)
	})
})
