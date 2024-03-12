import { useEffect } from 'react'

function Page() {
	useEffect(() => {
		fetch('/mock-api/api/user/profile?mockFile=user', {
			headers: {
				Authorization: 'Bearer your-jwt-token',
				'Content-Type': 'application/json; charset=UTF-8',
			},
		})
	}, [])

	return <div>login</div>
}

export default Page
