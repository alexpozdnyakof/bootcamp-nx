import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditableText from './editable-text'

describe('EditableText', () => {
	it('should render text', () => {
		render(<EditableText value='素' />)
		expect(screen.getByText('素')).toBeInTheDocument()
	})

	it('should toggle to edit mode when doubleclicked', async () => {
		render(<EditableText value='素' />)
		const staticText = screen.getByText('素')

		expect(staticText).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).not.toBeInTheDocument()

		await userEvent.dblClick(screen.getByRole('switch'))

		expect(staticText).not.toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).toBeInTheDocument()
	})

	it('should focus textfield in edit mode', async () => {
		render(<EditableText value='素' />)

		await userEvent.dblClick(screen.getByRole('switch'))

		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).toHaveFocus()
	})

	it('should cancel edit mode after esc pressed', async () => {
		render(<EditableText value='素' />)

		expect(screen.getByText('素')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).not.toBeInTheDocument()

		await userEvent.dblClick(screen.getByRole('switch'))
		await userEvent.keyboard('{esc}')

		expect(screen.getByText('素')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).not.toBeInTheDocument()
	})

	it('should cancel edit mode after input field lost focus', async () => {
		render(<EditableText value='素' />)

		expect(screen.getByText('素')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).not.toBeInTheDocument()

		await userEvent.dblClick(screen.getByRole('switch'))
		await userEvent.tab()

		expect(screen.getByText('素')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).not.toBeInTheDocument()
	})
	it('should set subtitle size', () => {
		const { rerender } = render(<EditableText value='素' />)

		expect(screen.getByRole('switch')).not.toHaveClass('size-subtitle')

		rerender(<EditableText value='素' size='subtitle' />)

		expect(screen.getByRole('switch')).toHaveClass('size-subtitle')
	})
})
