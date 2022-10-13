import { screen, render } from '@testing-library/react'

import Userpic from './userpic'

describe('Userpic', () => {
	it('supports responsive values', () => {
		render(
			<Userpic
				data-testid='userpic'
				size={{
					mobile: 's',
					desktop: 'xl',
					tablet: 'xxl',
				}}
				user={{ email: 'alexpozdnyakof@gmail.com' }}
			/>
		)
		const userpic = screen.getByTestId('userpic')
		expect(userpic).toHaveClass('size-s')
		expect(userpic).toHaveClass('desktop-size-xl')
		expect(userpic).toHaveClass('tablet-size-xxl')
	})

	describe('initials', () => {
		it('create initials from email when username is empty', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{ email: 'alexpozdnyakof@gmail.com' }}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic.innerHTML).toBe('A')
		})

		it('create uppercased initials when user have first and last name', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{
						name: 'alex pozdnyakof',
						email: 'alexpozdnyakof@gmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic.innerHTML).toBe('AP')
		})
		it('create uppercased initials from first and last name when username have more than two words', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{
						name: 'alex the great pozdnyakof',
						email: 'alexpozdnyakof@gmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic.innerHTML).toBe('AP')
		})
		it('create single uppercased initial when username have one name', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{
						name: 'alex',
						email: 'alexpozdnyakof@gmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic.innerHTML).toBe('A')
		})
		it('create single uppercased initial when first and last name have same first symbol', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{
						name: 'alex abramov',
						email: 'alexpozdnyakof@gmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic.innerHTML).toBe('A')
		})
	})
	describe('background colors', () => {
		it('set first color for invalid email', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{
						email: 'alexpozdnyakofgmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic).toHaveStyle({ backgroundColor: '#fcc652' })
		})

		it('set first color if first email part is empty', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{
						email: '@gmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic).toHaveStyle({ backgroundColor: '#fcc652' })
		})

		it('set color in colors range for given valid email', () => {
			render(
				<Userpic
					data-testid='userpic'
					user={{
						email: 'alexpozdnyakof@gmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic).toHaveStyle({ backgroundColor: '#e9952c' })
		})

		it('set same color for same emails', () => {
			const { rerender } = render(
				<Userpic
					data-testid='userpic'
					user={{
						email: 'alexpozdnyakof@gmail.com',
					}}
				/>
			)
			const userpic = screen.getByTestId('userpic')
			expect(userpic).toHaveStyle({ backgroundColor: '#e9952c' })

			rerender(
				<Userpic
					data-testid='userpic'
					user={{
						email: 'alexpozdnyakof@gmail.com',
					}}
				/>
			)
			expect(userpic).toHaveStyle({ backgroundColor: '#e9952c' })
		})
	})
	it('renders a background image when imageUrl prop passed', () => {
		render(
			<Userpic
				data-testid='userpic'
				imageUrl='https://company.url/userpic.jpg'
				user={{
					email: 'alexpozdnyakof@gmail.com',
				}}
			/>
		)
		const userpic = screen.getByTestId('userpic')

		expect(userpic).toMatchInlineSnapshot(`
		<div
		  class="userpic size-l Box"
		  data-testid="userpic"
		  style="background-image: url(https://company.url/userpic.jpg); text-indent: -999px;"
		>
		  A
		</div>
	`)
	})
})
