import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import EditableText from './editable-text'

describe('EditableText', () => {
	it('should render text', () => {
		render(<EditableText value='素晴らしいタスクリスト' />)
		expect(screen.getByText('素晴らしいタスクリスト')).toBeInTheDocument()
	})

	it('should toggle to edit mode when doubleclicked', async () => {
		render(<EditableText value='素晴らしいタスクリスト' />)
		const staticText = screen.getByText('素晴らしいタスクリスト')

		expect(staticText).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素晴らしいタスクリスト',
			})
		).not.toBeInTheDocument()

		await userEvent.dblClick(screen.getByRole('switch'))

		expect(staticText).not.toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素晴らしいタスクリスト',
			})
		).toBeInTheDocument()
	})

	it('should focus textfield in edit mode', async () => {
		render(<EditableText value='素晴らしいタスクリスト' />)

		await userEvent.dblClick(screen.getByRole('switch'))

		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素晴らしいタスクリスト',
			})
		).toHaveFocus()
	})

	it('should cancel edit mode after esc pressed', async () => {
		render(<EditableText value='素晴らしいタスクリスト' />)

		expect(screen.getByText('素晴らしいタスクリスト')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素晴らしいタスクリスト',
			})
		).not.toBeInTheDocument()

		await userEvent.dblClick(screen.getByRole('switch'))
		await userEvent.keyboard('{esc}')

		expect(screen.getByText('素晴らしいタスクリスト')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素晴らしいタスクリスト',
			})
		).not.toBeInTheDocument()
	})

	it('should cancel edit mode after input field lost focus', async () => {
		render(<EditableText value='素晴らしいタスクリスト' />)

		expect(screen.getByText('素晴らしいタスクリスト')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素晴らしいタスクリスト',
			})
		).not.toBeInTheDocument()

		await userEvent.dblClick(screen.getByRole('switch'))
		await userEvent.tab()

		expect(screen.getByText('素晴らしいタスクリスト')).toBeInTheDocument()
		expect(
			screen.queryByRole('textbox', {
				name: 'Edit 素晴らしいタスクリスト',
			})
		).not.toBeInTheDocument()
	})
	it.todo('should set font size for block')
})
