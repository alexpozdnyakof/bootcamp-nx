import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditableText from './editable-text'

describe('EditableText', () => {
	it('should render text', () => {
		render(<EditableText onChange={(value: string) => 0}>素</EditableText>)
		expect(screen.getByText('素')).toBeInTheDocument()
	})

	it('should toggle to edit mode when doubleclicked', async () => {
		render(<EditableText onChange={(value: string) => 0}>素</EditableText>)
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
		render(<EditableText onChange={(value: string) => 0}>素</EditableText>)

		await userEvent.dblClick(screen.getByRole('switch'))

		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素',
			})
		).toHaveFocus()
	})

	it('should cancel edit mode after esc pressed', async () => {
		render(<EditableText onChange={(value: string) => 0}>素</EditableText>)

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
		render(<EditableText onChange={(value: string) => 0}>素</EditableText>)

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
		const { rerender } = render(
			<EditableText onChange={(value: string) => 0}>素</EditableText>
		)

		expect(screen.getByRole('switch')).not.toHaveClass('size-subtitle')

		rerender(
			<EditableText size='subtitle' onChange={(value: string) => 0}>
				素
			</EditableText>
		)

		expect(screen.getByRole('switch')).toHaveClass('size-subtitle')
	})

	it('should call onChange callback after enter pressed', async () => {
		const onChange = jest.fn()
		render(<EditableText onChange={onChange}>素</EditableText>)

		await userEvent.dblClick(screen.getByRole('switch'))
		await userEvent.type(screen.getByRole('textbox'), '晴{enter}')
		expect(onChange).toBeCalledWith('素晴')
	})

	it('should hide form after enter pressed', async () => {
		render(<EditableText onChange={value => 0}>素</EditableText>)

		expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

		await userEvent.dblClick(screen.getByRole('switch'))
		expect(screen.queryByRole('textbox')).toBeInTheDocument()

		await userEvent.type(screen.getByRole('textbox'), '晴{enter}')
		expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
	})
})
