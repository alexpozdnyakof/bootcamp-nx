describe('project', () => {
	// before(() => {
	// })
	beforeEach(() => {
		cy.task('db:seed')
		cy.login('test@test.com', 'password4')
		cy.visit('/1')
	})

	it('should contain info about project', () => {
		cy.contains('ホームページのリニューアル')
		cy.contains('新しいフレッシュホームページの制作過程はこちら')
		cy.contains('2022-11-29 15:31:37')
	})

	it('should contain all related tasklists', () => {
		cy.contains('すべてのフロントエンド タスク')
		cy.contains('すべてのバックエンド タスク')
	})

	it('should contain all related tasks', () => {
		cy.contains('血液レポートのグラフが空白になっている')
		cy.contains('無効にする|| ユーザーがアカウントを無効にできない')
		cy.contains('プロフィール、プロフィールの編集、ポップアップ')
	})

	it('should create new task', () => {
		cy.get('button:contains("タスクを作成")').first().click()

		cy.get('input[aria-label="Create new task"]')
			.first()
			.type('プロジェクト ページの機能を作成する')

		cy.intercept('/api/task*').as('addTask')
		cy.intercept('/api/tasklist/1/task').as('addTaskToTasklist')

		cy.get('button:contains("作成")').first().click()
		cy.wait('@addTask')
		cy.wait('@addTaskToTasklist')
		cy.contains('プロジェクト ページの機能を作成する')
	})

	it('should complete task', () => {
		cy.get(
			'[aria-label="Complete 血液レポートのグラフが空白になっている"]'
		).as('taskSwitchComplete')

		cy.get('@taskSwitchComplete').should(
			'have.attr',
			'aria-checked',
			'false'
		)
		cy.intercept('/api/task/*').as('changeTaskStatusRequest')

		cy.get('@taskSwitchComplete').click()

		cy.wait('@changeTaskStatusRequest')

		cy.get('@taskSwitchComplete').should(
			'have.attr',
			'aria-checked',
			'true'
		)
	})
	it('should uncomplete task', () => {
		cy.get(
			'[aria-label="Complete 無効にする|| ユーザーがアカウントを無効にできない"]'
		).as('taskSwitchComplete')

		cy.get('@taskSwitchComplete').should(
			'have.attr',
			'aria-checked',
			'true'
		)
		cy.intercept('/api/task/*').as('changeTaskStatusRequest')

		cy.get('@taskSwitchComplete').click()

		cy.wait('@changeTaskStatusRequest')

		cy.get('@taskSwitchComplete').should(
			'have.attr',
			'aria-checked',
			'false'
		)
	})

	it('should delete task', () => {
		cy.contains('血液レポートのグラフが空白になっている')
		cy.intercept('/api/task/*').as('deleteTaskRequest')
		cy.get(
			'[aria-label="Delete 血液レポートのグラフが空白になっている"]'
		).click()

		cy.wait('@deleteTaskRequest')
		cy.contains('血液レポートのグラフが空白になっている').should(
			'not.exist'
		)
	})

	it('should change task title', () => {
		cy.contains('プロフィール、プロフィールの編集、ポップアップ')
		cy.intercept('/api/task/*').as('editTaskRequest')

		cy.get(
			'[aria-label="Edit プロフィール、プロフィールの編集、ポップアップ"]'
		).dblclick()

		cy.get(
			'input[value=プロフィール、プロフィールの編集、ポップアップ]'
		).type('血液{enter}')

		cy.wait('@editTaskRequest')
		cy.contains('プロフィール、プロフィールの編集、ポップアップ血液')
	})
})
