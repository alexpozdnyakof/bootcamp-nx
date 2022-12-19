export type ErrorResult =
	| {
			code: 400
			message: 'Bad Request'
	  }
	| {
			code: 404
			message: 'Not Found'
	  }
	| {
			code: 500
			message: 'Server Error'
	  }
