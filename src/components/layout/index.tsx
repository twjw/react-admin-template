import { ReactNode } from 'react'

function Layout({ children }: { children: ReactNode }) {
	return (
		<div className={'w-full min-h-screen flex flex-col'}>
			<div>header</div>
			<div className={'flex flex-1'}>
				<div className={'w-240'}>sidebar</div>
				<div className={'flex-1 flex flex-col'}>{children}</div>
			</div>
		</div>
	)
}

export { Layout }
