import { defineConfig } from 'cypress'
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset'
import 'isomorphic-fetch'

export default defineConfig({
	env: {
		testUsername: 'test@test.com',
		testPassword: 'password4',
		apiUrl: 'http://localhost:3333/api',
	},
	e2e: {
		experimentalSessionAndOrigin: true,
		setupNodeEvents(on, config) {
			const testEndpoint = `${config.env.apiUrl}/test`
			on('task', {
				async 'db:seed'() {
					return fetch(`${testEndpoint}/seed`, {
						method: 'POST',
					}).then(response => response.text())
				},
			})
			return config
		},
		...nxE2EPreset(__dirname),
	},
})
