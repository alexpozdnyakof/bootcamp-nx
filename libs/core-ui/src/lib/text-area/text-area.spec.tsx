import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'

import TextArea from './text-area'

describe('Textrea', () => {
	it('should set custom id', () => {
		render(
			<TextArea
				id='custom'
				data-testid='textarea-element'
				label='Task description'
			/>
		)

		expect(screen.getByTestId('textarea-element').id).toBe('custom')
	})

	it('should be labelled by its main label and secondary label', () => {
		const { rerender } = render(
			<TextArea data-testid='textarea-element' label='Task description' />
		)
		const textAreaElement = screen.getByTestId('textarea-element')

		expect(textAreaElement).toHaveAccessibleName('Task description')

		rerender(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				secondaryLabel='optional'
			/>
		)

		expect(textAreaElement).toHaveAccessibleName(
			'Task description (optional)'
		)
	})

	it('should be labelled by aria-label', () => {
		render(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				aria-label='What need to do'
			/>
		)
		const textAreaElement = screen.getByTestId('textarea-element')
		expect(textAreaElement).toHaveAccessibleName('What need to do')
	})

	it('should be labelled by aria-labelledby', () => {
		render(
			<>
				<TextArea
					data-testid='textarea-element'
					label='Task description'
					aria-labelledby='custom-label'
				/>
				<div id='custom-label'>What need to do</div>
			</>
		)
		const textAreaElement = screen.getByTestId('textarea-element')
		expect(textAreaElement).toHaveAccessibleName('What need to do')
	})

	it('should be describe by its hint', () => {
		render(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				hint='What need to do'
			/>
		)
		const textAreaElement = screen.getByTestId('textarea-element')
		expect(textAreaElement).toHaveAccessibleDescription('What need to do')
	})

	it('should be described by external block through aria-describedby', () => {
		render(
			<>
				<TextArea
					data-testid='textarea-element'
					label='Task description'
					aria-describedby='custom-hint'
				/>
				<div id='custom-hint'>What need to do</div>
			</>
		)
		const textAreaElement = screen.getByTestId('textarea-element')
		expect(textAreaElement).toHaveAccessibleDescription('What need to do')
	})

	it('should be mark as invalid when tone equal error', () => {
		render(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				tone='error'
			/>
		)
		const textAreaElement = screen.getByTestId('textarea-element')
		expect(textAreaElement).toBeInvalid()
	})

	it('should add the message as part of the description when tone is not error', () => {
		render(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				hint='What need to do'
				message='Task created succesfully'
				tone='success'
			/>
		)
		const textAreaElement = screen.getByTestId('textarea-element')
		expect(textAreaElement).toHaveAccessibleDescription(
			'Task created succesfully What need to do'
		)
	})

	it('should render auxiliary label', () => {
		render(
			<TextArea
				label='Task description'
				auxiliaryLabel={<a href='/help'>How to describe?</a>}
			/>
		)
		expect(
			screen.queryByRole('link', { name: 'How to describe?' })
		).toBeInTheDocument()
	})

	it('should not use the auxiliary label for semantic labelling', () => {
		render(
			<TextArea
				label='Task description'
				auxiliaryLabel={<a href='/help'>How to describe?</a>}
			/>
		)
		expect(
			screen.queryByRole('textbox', { name: /Describe your task/ })
		).not.toBeInTheDocument()

		expect(screen.getByRole('textbox')).toHaveAccessibleName(
			'Task description'
		)
		expect(screen.getByRole('textbox')).not.toHaveAccessibleDescription()
	})

	it('should have a placeholder text', () => {
		render(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				placeholder='Describe your task'
			/>
		)

		expect(screen.getByTestId('textarea-element')).toBe(
			screen.getByPlaceholderText('Describe your task')
		)
	})

	it('should be hidden when hidden prop provided', () => {
		const { rerender } = render(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				hint='Describe your task'
				hidden
			/>
		)

		const textAreaElement = screen.getByTestId('textarea-element')
		const hintElement = screen.getByText(/Describe your task/)

		expect(textAreaElement).not.toBeVisible()
		expect(
			screen.queryByRole('textbox', { name: 'Task description' })
		).not.toBeInTheDocument()
		expect(hintElement).not.toBeVisible()
		expect(screen.getByText(/Describe your task/)).toBeInTheDocument()

		rerender(
			<TextArea
				data-testid='textarea-element'
				label='Task description'
				hint='Describe your task'
			/>
		)

		expect(textAreaElement).toBeVisible()
		expect(
			screen.queryByRole('textbox', { name: 'Task description' })
		).toBeInTheDocument()
		expect(hintElement).toBeVisible()
		expect(screen.getByText(/Describe your task/)).toBeInTheDocument()
	})

	it('should allow to type text', async () => {
		render(<TextArea label='Task description' />)
		const textAreaElement = screen.queryByRole('textbox', {
			name: 'Task description',
		}) as HTMLTextAreaElement

		expect(textAreaElement).toHaveValue('')
		await userEvent.type(textAreaElement, 'Create TextArea component')
		expect(textAreaElement).toHaveValue('Create TextArea component')
	})

	it('should be disabled', async () => {
		render(<TextArea label='Task description' disabled />)
		const textAreaElement = screen.queryByRole('textbox', {
			name: 'Task description',
		}) as HTMLTextAreaElement

		expect(textAreaElement).toBeDisabled()
		expect(textAreaElement).toHaveValue('')
		await userEvent.type(textAreaElement, 'Create TextArea component')
		expect(textAreaElement).toHaveValue('')
	})

	it('should be readonly', async () => {
		render(<TextArea label='Task description' readOnly />)
		const textAreaElement = screen.queryByRole('textbox', {
			name: 'Task description',
		}) as HTMLTextAreaElement

		expect(textAreaElement).not.toBeDisabled()
		expect(textAreaElement).toHaveValue('')
		await userEvent.type(textAreaElement, 'Create TextArea component')
		expect(textAreaElement).toHaveValue('')
	})

	it('can be a controlled field', async () => {
		const TestCase = () => {
			const [value, setValue] = useState('')
			return (
				<>
					<TextArea
						label='Task description'
						value={value}
						onChange={event => setValue(event.currentTarget.value)}
					/>
					<div data-testid='value'>{value}</div>
				</>
			)
		}
		render(<TestCase />)
		const textAreaElement = screen.getByRole('textbox', {
			name: 'Task description',
		})

		expect(textAreaElement).toHaveValue('')
		await userEvent.type(textAreaElement, 'Create TextArea component')
		expect(textAreaElement).toHaveValue('Create TextArea component')
		expect(screen.getByTestId('value')).toHaveTextContent(
			'Create TextArea component'
		)
	})
})
