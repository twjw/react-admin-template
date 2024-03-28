import { TsFetchListenerRequestInit } from 'wtbx-type-safe-fetch'

export type ApiResponse<T> = {
	success: boolean
	message: string
	data?: T
}

export type MyRequestInitOther = {
	responseType?: 'json' | 'text' // auto-response 用，default: json
	originUrl: string
	_mri_: number // merge-same-request 用
}

export type MyListenerRequestInit = TsFetchListenerRequestInit & MyRequestInitOther

export type MyRequestInit = Omit<MyRequestInitOther, 'originUrl' | '_mri_'>
