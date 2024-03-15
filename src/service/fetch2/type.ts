import { TsFetchListenerRequestInit } from 'wtbx-type-safe-fetch'

export type ApiResponse<T> = {
	success: boolean
	message: string
	data?: T
}

export type MyRequestInitOther = {
	// auto-response 用，default: json
	responseType?: 'json' | 'text'
}

export type MyListenerRequestInit = TsFetchListenerRequestInit & MyRequestInitOther
