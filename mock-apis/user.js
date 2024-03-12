export default {
	// expiredMinutes number 過期分鐘數
	'/api/user/login': ({ body, query }) => {
		if (body.username !== 'test' && body.password !== '123123')
			return {
				code: 500,
				data: '帳號或密碼錯誤',
			}

		return {
			code: 200,
			data: {
				token: Date.now() + (query.expiredMinutes || 1) * 1000 * 60,
			},
		}
	},
	'/api/user/profile': ({ headers }) => {
		if (!headers.Authorization || !headers.Authorization?.test(/^Bearer\s\d+/)) {
			return {
				code: 403,
				data: '請傳遞有效的驗證參數',
			}
		}

		if (Date.now() > Number(headers.Authorization.match(/^Bearer\s(\d+)/)[1]))
			return {
				code: 403,
				data: 'token 已失效',
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
