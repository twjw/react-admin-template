import { hookInstances, ResetErrorBoundary } from '@/constants'

type ErrorPageProps = {
	code:
		| 404 // 找不到頁面 NOT FOUND
		| 500 // 頁面錯誤 INTERNAL SERVER ERROR
}

function BaseError(props: ErrorPageProps) {
	const { error, resetErrorBoundary, code } = props as Partial<{
		didCatch: boolean
		error: any
		resetErrorBoundary: ResetErrorBoundary
	}> &
		ErrorPageProps

	if (resetErrorBoundary != null) {
		hookInstances.resetErrorBoundary = resetErrorBoundary
	}

	return (
		<div>
			<div>發生錯誤(code: {code})</div>
			{error != null && <div>{error.message}</div>}
		</div>
	)
}

export { BaseError }
