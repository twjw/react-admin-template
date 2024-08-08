import { type ReactNode, useEffect, useState } from 'react'
import { debounce } from '@/util/fake-lodash.ts'

export type RwdElementProps = {
	breakpoints: number[]
	children: (e: number) => ReactNode
}

export function matchBreakpoint(breakpoints: number[]): number {
	for (let i = 0; i < breakpoints.length; i++) {
		if (window.innerWidth < breakpoints[i]) {
			return breakpoints[i]
		}
	}

	// 最大數表示皆不匹配
	return Number.MAX_SAFE_INTEGER
}

export function useRwd<T extends number[]>(breakpoints: T): [T[number]] {
	const [breakpoint, setBreakpoint] = useState<number>(() => matchBreakpoint(breakpoints))

	useEffect(() => {
		const debounceListener = debounce(() => {
			const breakpoint = matchBreakpoint(breakpoints)
			setBreakpoint(breakpoint)
		}, 150)

		window.addEventListener('resize', debounceListener)
		return () => window.removeEventListener('resize', debounceListener)
	}, [])

	return [breakpoint]
}

export function RwdElement({ breakpoints, children }: RwdElementProps) {
	const [breakpoint] = useRwd(breakpoints)
	return children(breakpoint)
}
