export default {
	// expiredMinutes number 過期分鐘數
	'/api/user/login': ({ res, body, query }) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		if (!(body.username === 'admin' && body.password === '147147')) {
			res.statusCode = 500
			return {
				code: 500,
				message: '帳號或密碼錯誤',
				data: null,
			}
		}

		return {
			code: 200,
			message: '成功',
			data: {
				token: String(Date.now() + (query.expiredMinutes || 1) * 1000 * 60),
			},
		}
	},
	'/api/user/profile': ({ res, headers }) => {
		res.setHeader('Content-Type', 'application/json; charset=utf-8')

		if (!headers.authorization || !/^Bearer\s\d+/.test(headers.authorization)) {
			res.statusCode = 403
			return {
				code: 403,
				message: '請傳遞有效的驗證參數',
				data: null,
			}
		}

		if (Date.now() > Number(headers.authorization.match(/^Bearer\s(\d+)/)[1])) {
			res.statusCode = 403
			return {
				code: 403,
				message: 'token 已失效',
				data: null,
			}
		}

		return {
			code: 200,
			message: '成功',
			data: {
				id: 1,
				name: 'twjw',
			},
		}
	},
}
