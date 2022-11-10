import { screen, render, fireEvent } from '@testing-library/react'
import { utimes } from 'fs/promises'
import Button from './button'

describe('Button', () => {
	it('renders a semantic button', () => {
		render(<Button variant='primary'>Click me</Button>)
		expect(
			screen.getByRole('button', { name: 'Click me' })
		).toBeInTheDocument()
	})

	it('should apply different class names based on variant', () => {
		const { rerender } = render(
			<Button data-testid='button'>Button</Button>
		)
		const button = screen.getByTestId('button')

		expect(button).toHaveClass(
			'variant-primary',
			'tone-normal',
			'size-normal'
		)
		expect(button).not.toHaveClass('variant-secondary')
		expect(button).not.toHaveClass('variant-tertiary')
		expect(button).not.toHaveClass('variant-quaternary')

		rerender(<Button variant='secondary'>Click me</Button>)
		expect(button).toHaveClass(
			'variant-secondary',
			'tone-normal',
			'size-normal'
		)
		expect(button).not.toHaveClass('variant-primary')
		expect(button).not.toHaveClass('variant-tertiary')
		expect(button).not.toHaveClass('variant-quaternary')

		rerender(<Button variant='tertiary'>Click me</Button>)
		expect(button).toHaveClass(
			'variant-tertiary',
			'tone-normal',
			'size-normal'
		)
		expect(button).not.toHaveClass('variant-primary')
		expect(button).not.toHaveClass('variant-secondary')
		expect(button).not.toHaveClass('variant-quaternary')

		rerender(<Button variant='quaternary'>Click me</Button>)
		expect(button).toHaveClass(
			'variant-quaternary',
			'tone-normal',
			'size-normal'
		)
		expect(button).not.toHaveClass('variant-primary')
		expect(button).not.toHaveClass('variant-secondary')
		expect(button).not.toHaveClass('variant-tertiary')
	})

	it('applies different class names based on tone', () => {
		const { rerender } = render(<Button variant='primary'>Click me</Button>)
		const button = screen.getByRole('button', { name: 'Click me' })
		expect(button).toHaveClass(
			'variant-primary',
			'tone-normal',
			'size-normal'
		)
		expect(button).not.toHaveClass('tone-destructive')

		rerender(
			<Button variant='primary' tone='destructive'>
				Click me
			</Button>
		)
		expect(button).toHaveClass(
			'variant-primary',
			'tone-destructive',
			'size-normal'
		)
		expect(button).not.toHaveClass('tone-normal')
	})

	it('applies different class names based on size', () => {
		const { rerender } = render(
			<Button variant='primary' size='normal'>
				Click me
			</Button>
		)
		const button = screen.getByRole('button', { name: 'Click me' })
		expect(button).toHaveClass(
			'variant-primary',
			'tone-normal',
			'size-normal'
		)
		expect(button).not.toHaveClass('size-small')
		expect(button).not.toHaveClass('size-large')

		rerender(
			<Button variant='secondary' size='small'>
				Click me
			</Button>
		)
		expect(button).toHaveClass(
			'variant-secondary',
			'tone-normal',
			'size-small'
		)
		expect(button).not.toHaveClass('size-normal')
		expect(button).not.toHaveClass('size-large')

		rerender(
			<Button variant='tertiary' size='large'>
				Click me
			</Button>
		)
		expect(button).toHaveClass(
			'variant-tertiary',
			'tone-normal',
			'size-large'
		)
		expect(button).not.toHaveClass('size-normal')
		expect(button).not.toHaveClass('size-small')
	})

	it('should call onClick handler when clicked', () => {
		const onClick = jest.fn()
		render(
			<Button variant='primary' onClick={onClick}>
				Click me
			</Button>
		)
		const button = screen.getByRole('button', { name: 'Click me' })
		expect(button).not.toHaveAttribute('aria-disabled', 'true')
		expect(onClick).not.toHaveBeenCalled()
		fireEvent.click(button)
		expect(onClick).toHaveBeenCalledTimes(1)
	})

	it('should ignore clicks when disabled', () => {
		const onClick = jest.fn()
		render(
			<Button variant='primary' onClick={onClick} disabled>
				Click me
			</Button>
		)
		const button = screen.getByRole('button', { name: 'Click me' })
		expect(button).toHaveAttribute('aria-disabled', 'true')
		expect(onClick).not.toHaveBeenCalled()
		fireEvent.click(button)
		expect(onClick).not.toHaveBeenCalled()
	})
	it('submits a form when used with type="submit"', () => {
		const onSubmit = jest.fn(event => event.preventDefault())

		render(
			<form onSubmit={onSubmit}>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</form>
		)
		const button = screen.getByRole('button', { name: 'Submit' })
		expect(button).not.toHaveAttribute('aria-disabled', 'true')
		expect(button).toHaveAttribute('type', 'submit')
		expect(onSubmit).not.toHaveBeenCalled()
		fireEvent.click(button)
		expect(onSubmit).toHaveBeenCalledTimes(1)
	})

	it('does not submits a form when disabled', () => {
		const onSubmit = jest.fn(event => event.preventDefault())

		render(
			<form onSubmit={onSubmit}>
				<Button variant='primary' type='submit' disabled>
					Submit
				</Button>
			</form>
		)
		const button = screen.getByRole('button', { name: 'Submit' })
		expect(button).toHaveAttribute('aria-disabled', 'true')
		expect(onSubmit).not.toHaveBeenCalled()
		fireEvent.click(button)
		expect(onSubmit).not.toHaveBeenCalled()
	})
	it('renders its children as its content', () => {
		render(
			<Button variant='primary'>
				Click me <strong>now</strong>
			</Button>
		)
		expect(
			screen.getByRole('button', { name: 'Click me now' }).innerHTML
		).toMatchInlineSnapshot(
			`"<span class=\\"label\\">Click me <strong>now</strong></span>"`
		)
	})

	describe('when loading={true}', () => {
		it('ignores clicks', () => {
			const onClick = jest.fn()
			render(
				<Button variant='primary' loading onClick={onClick}>
					Click me
				</Button>
			)
			fireEvent.click(screen.getByRole('button', { name: 'Click me' }))
			expect(onClick).not.toHaveBeenCalled()
		})
		it('does not submit a form', () => {
			const onSubmit = jest.fn(event => event.preventDefault())
			render(
				<form onSubmit={onSubmit}>
					<Button variant='primary' type='submit' loading>
						Submit
					</Button>
				</form>
			)
			const button = screen.getByRole('button', { name: 'Submit' })
			expect(button).toHaveAttribute('aria-disabled', 'true')
			expect(button).toHaveAttribute('type', 'submit')
			expect(onSubmit).not.toHaveBeenCalled()
			fireEvent.click(button)
			expect(onSubmit).not.toHaveBeenCalled()
		})
		it('renders the button with aria-disabled="true"', () => {
			render(
				<Button variant='primary' loading>
					Click me
				</Button>
			)
			expect(
				screen.getByRole('button', { name: 'Click me' })
			).toHaveAttribute('aria-disabled', 'true')
		})
	})

	it('should add iconButton class when icon passed', () => {
		render(<Button variant='primary' icon={<div />} />)

		expect(screen.getByRole('button')).toHaveClass('iconButton')
	})

	it('should not render children when icon passed', () => {
		render(
			<Button variant='primary' icon={<div data-testid='icon' />}>
				Click me!
			</Button>
		)

		expect(screen.queryByText('Click me!')).not.toBeInTheDocument()
		expect(screen.getByTestId('icon')).toBeInTheDocument()
	})
})
