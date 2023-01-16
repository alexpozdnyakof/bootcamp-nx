import { AuthController } from './auth-controller'
import { json } from 'body-parser'
import express from 'express'
import { database } from '../database'
import request from 'supertest'
describe('Auth Controller', () => {
	const env = process.env
	const App = express()

	const USER_DTO = {
		username: 'test4@gmail.com',
		password: 'password1',
		first_name: 'alex',
		last_name: 'pozdnyakof',
		birthdate: new Date().toISOString(),
	}

	const CREDENTIALS = {
		username: 'test@test.com',
		password: 'password4',
	}

	async function makeUserMigrations() {
		await database.migrate.up({
			name: '20230103123928_create_user_table.js',
		})
		await database.migrate.up({
			name: '20230113101227_create_credential_table.js',
		})
		await database.migrate.up({
			name: '20230113102157_create_user_to_credentials_table.js',
		})
		await database.seed.run({ specific: '00-user.js' })
	}

	beforeAll(async () => {
		App.use(json())
		App.use('/', AuthController)

		await makeUserMigrations()
		process.env.SECRET_KEY = '123qwe123'
	})

	afterAll(() => {
		jest.resetModules()
		process.env = env
	})

	describe('SignIn', () => {
		it('should sign in for existing user with match password', async () => {
			const response = await request(App)
				.post('/sign-in')
				.set('Accept', 'application/json')
				.send(CREDENTIALS)

			const cookies = response.headers['set-cookie'][0].split('=')

			expect(response.status).toBe(200)
			expect(cookies[0]).toBe('refreshToken')
		})
		it('should return error for non-existing user', async () => {
			const response = await request(App)
				.post('/sign-in')
				.set('Accept', 'application/json')
				.send({ ...CREDENTIALS, username: '123@mail.ru' })

			expect(response.status).toBe(401)
		})
		xit('should return error for user with wrong password', async () => {
			const response = await request(App)
				.post('/sign-in')
				.set('Accept', 'application/json')
				.send({ ...CREDENTIALS, password: '123123' })

			expect(response.status).toBe(401)
		})
	})

	describe('SignUp', () => {
		xit('should create new user', async () => {
			const response = await request(App)
				.post('/sign-up')
				.set('Accept', 'application/json')
				.send(USER_DTO)

			const cookies = response.headers['set-cookie'][0].split('=')

			expect(response.status).toBe(201)
			expect(cookies[0]).toBe('refreshToken')
		})
		it('should return error if user already exist', async () => {
			const response = await request(App)
				.post('/sign-up')
				.set('Accept', 'application/json')
				.send({
					username: 'test@test.com',
					password: '123qwe123',
				})
			expect(response.status).toBe(400)
		})
		it('should return error if username not sended', async () => {
			const response = await request(App)
				.post('/sign-up')
				.set('Accept', 'application/json')
				.send({
					password: '123qwe123',
				})
			expect(response.status).toBe(400)
		})
		it('should return error if password not sended', async () => {
			const response = await request(App)
				.post('/sign-up')
				.set('Accept', 'application/json')
				.send({
					username: 'test@test.com',
				})
			expect(response.status).toBe(400)
		})
		it('should return error if email invalid', async () => {
			const response = await request(App)
				.post('/sign-up')
				.set('Accept', 'application/json')
				.send({
					username: 'testtest.com',
					password: '123qwe123',
				})
			expect(response.status).toBe(400)
		})
	})
})
