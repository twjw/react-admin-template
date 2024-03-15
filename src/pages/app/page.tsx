import { Outlet } from 'react-router-dom'
import { Layout } from '@/components/layout'

function Page() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}

export default Page
