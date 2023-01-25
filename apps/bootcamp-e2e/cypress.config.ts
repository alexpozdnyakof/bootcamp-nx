import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset'

export default defineConfig({
	e2e: {
		experimentalSessionAndOrigin: true,
		...nxE2EPreset(__dirname),
	},
})
