import { Outlet } from 'react-router-dom'
import { Layout } from '@/component/layout'

function Page() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}

export default Page
