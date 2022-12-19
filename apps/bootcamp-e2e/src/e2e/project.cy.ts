describe('project', () => {
	beforeEach(() => {
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

		cy.get('button:contains("作成")').first().click()

		// cy.contains('プロジェクト ページの機能を作成する')
	})
})
