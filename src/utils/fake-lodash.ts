export function debounce<Func extends Function>(fn: Func, delay = 300) {
	let timerId: NodeJS.Timeout | null

	return function (...args: Func extends (...args: infer Args) => any ? Args : never[]) {
		if (timerId) {
			clearTimeout(timerId)
		}

		timerId = setTimeout(() => {
			fn(...args)
			timerId = null
		}, delay)
	}
}
