export default {
	// expiredMinutes number 過期分鐘數
	'/api/user/login': ({ res, body, query }) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		if (!(body.username === 'test' && body.password === '123123')) {
			res.statusCode = 500
			return {
				code: 500,
				data: '帳號或密碼錯誤',
			}
		}

		return {
			code: 200,
			data: {
				token: Date.now() + (query.expiredMinutes || 1) * 1000 * 60,
			},
		}
	},
	'/api/user/profile': ({ res, headers }) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		if (!headers.Authorization || !headers.Authorization?.test(/^Bearer\s\d+/)) {
			res.statusCode = 403
			return {
				code: 403,
				data: '請傳遞有效的驗證參數',
			}
		}

		if (Date.now() > Number(headers.Authorization.match(/^Bearer\s(\d+)/)[1])) {
			res.statusCode = 403
			return {
				code: 403,
				data: 'token 已失效',
			}
		}

		return {
			code: 200,
			data: {
				id: 1,
				name: 'twjw',
				headers,
			},
		}
	},
}
