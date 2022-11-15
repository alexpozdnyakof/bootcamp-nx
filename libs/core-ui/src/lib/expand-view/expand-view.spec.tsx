import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ComponentProps } from 'react'

import ExpandView from './expand-view'

describe('ExpandView', () => {
	const ViewUnderTest = ({
		expanded = false,
	}: Omit<ComponentProps<typeof ExpandView>, 'children'>) => (
		<ExpandView expanded={expanded}>
			{(toggleExpand, expanded) => (
				<>
					{!expanded && <div onClick={toggleExpand}>expand</div>}
					{expanded && <div onMouseOver={toggleExpand}>expanded</div>}
				</>
			)}
		</ExpandView>
	)
	it('should render successfully', () => {
		const { baseElement } = render(<ViewUnderTest />)
		expect(baseElement).toBeTruthy()
	})

	it('should render not expanded view by default', () => {
		render(<ViewUnderTest />)

		expect(screen.getByText('expand')).toBeInTheDocument()
		expect(screen.queryByText('expanded')).not.toBeInTheDocument()
	})

	it('should render expanded view after expanded toggled', async () => {
		render(<ViewUnderTest />)
		const expandElement = screen.getByText('expand')

		expect(expandElement).toBeInTheDocument()
		expect(screen.queryByText('expanded')).not.toBeInTheDocument()

		await userEvent.click(expandElement)
		expect(screen.queryByText('expand')).not.toBeInTheDocument()
		expect(screen.getByText('expanded')).toBeInTheDocument()
	})

	it('should make toggle expand when expanded', async () => {
		render(<ViewUnderTest />)
		const expandElement = screen.getByText('expand')

		await userEvent.click(expandElement)
		expect(screen.queryByText('expand')).not.toBeInTheDocument()
		expect(screen.getByText('expanded')).toBeInTheDocument()

		await userEvent.hover(screen.getByText('expanded'))

		expect(screen.queryByText('expand')).toBeInTheDocument()
		expect(screen.queryByText('expanded')).not.toBeInTheDocument()
	})

	it('should can be expanded by default', () => {
		render(<ViewUnderTest expanded={true} />)

		expect(screen.queryByText('expand')).not.toBeInTheDocument()
		expect(screen.queryByText('expanded')).toBeInTheDocument()
	})
	it('should can be unexpanded by default', () => {
		render(<ViewUnderTest expanded={false} />)

		expect(screen.queryByText('expand')).toBeInTheDocument()
		expect(screen.queryByText('expanded')).not.toBeInTheDocument()
	})
})
