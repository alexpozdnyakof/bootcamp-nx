import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './app/app'
import { stores, StoresProvider } from './app/stores'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<StrictMode>
		<StoresProvider value={stores}>
			<App />
		</StoresProvider>
	</StrictMode>
)
