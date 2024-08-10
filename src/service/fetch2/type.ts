import { TsFetchListenerRequestInit } from '@wymjs/type-safe-fetch'

export type ApiResponse<T> = {
	success: boolean
	message: string
	data?: T
}

export type MyRequestInitOther = {
	// auto-response 用，default: json
	responseType?: 'json' | 'text'
	originUrl: string
	// tool/merge-same-request 需要用到的參數
	_mri_: number
}

export type MyListenerRequestInit = TsFetchListenerRequestInit & MyRequestInitOther

export type MyRequestInit = Omit<MyRequestInitOther, 'originUrl' | '_mri_'>
