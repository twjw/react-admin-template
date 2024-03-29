import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import querystring from 'query-string'

export type UseSearchOptions = {
	isUpdateSearchParams?: boolean
	replace?: boolean
}

export type UpdateSearchOptions = UseSearchOptions

export function useSearch<T extends Record<string, any>>(
	defaultState: T,
	wrapOptions?: UseSearchOptions,
): [T, (actionState: T | ((prevState: T) => T), options?: UpdateSearchOptions) => void] {
	const [, setSearchParams] = useSearchParams()
	const [state, setState] = useState<T>(() => {
		const _state = defaultState
		const qsobj = querystring.parse(location.search)

		for (let k in qsobj) {
			if (_state.hasOwnProperty(k)) {
				;(_state[k] as any) = qsobj[k] === null ? true : qsobj[k]
			}
		}

		return _state
	})

	useEffect(updateSearchParams, [])

	function updateSearchParams(propState?: T, options?: UpdateSearchOptions) {
		const _options = {
			...wrapOptions,
			...options,
		}

		if (_options.isUpdateSearchParams === false) return

		setSearchParams(new URLSearchParams(querystring.stringify(propState || state)), {
			replace: _options.replace ?? true,
		})
	}

	function updateState(actionState: T | ((prevState: T) => T), options?: UpdateSearchOptions) {
		let state!: T
		setState(
			actionState instanceof Function ? e => (state = actionState(e)) : (state = actionState),
		)
		updateSearchParams(state, options)
	}

	return [state, updateState]
}
