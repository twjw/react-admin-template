import { useEffect } from 'react'
import { fetch2 } from '@/service/fetch2'

function Page() {
	useEffect(() => {
		fetch2('post:/mock-api/api/user/login?mockFile=user', {
			body: {
				username: 'test',
				password: '1231234',
			},
			// headers: {
			// 	Authorization: 'Bearer your-jwt-token',
			// 	'Content-Type': 'application/json; charset=UTF-8',
			// },
		}).then(res => {
			console.log(res)
		})
	}, [])

	return <div>login</div>
}

export default Page
