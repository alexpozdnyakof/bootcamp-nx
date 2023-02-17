import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { stores, StoresProvider } from './app/stores'
import App from './app/app'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<StrictMode>
		<StoresProvider value={stores}>
			<App />
		</StoresProvider>
	</StrictMode>
)
