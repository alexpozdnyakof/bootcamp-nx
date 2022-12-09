import { getByText, render, waitFor } from '@testing-library/react'
import App from './app'

describe('App', () => {
	xit('should render successfully', async () => {
		global.fetch = jest.fn().mockResolvedValueOnce({
			json: () => ({
				message: 'my message',
			}),
		})

		const { baseElement } = render(<App />)
		await waitFor(() => getByText(baseElement, 'my message'))
	})
})
