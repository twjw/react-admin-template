import { TsFetchTemplateDefineApis } from 'wtbx-type-safe-fetch'
import { ApiResponse } from '@/service/fetch2/type.ts'

export namespace Login {
	export type Params = {
		expiredMinutes?: number
	}
	export type Body = {
		username: string
		password: string
	}
	export type Response = {
		token: string
	}
}

export namespace Profile {
	export type Response = {
		id: number
		name: string
	}
}

export type Apis = TsFetchTemplateDefineApis<{
	'mock:user:get:/api/user/profile': {
		response: ApiResponse<Profile.Response>
	}
	'mock:user:post:/api/user/login': {
		params?: Login.Params
		body: Login.Body
		response: ApiResponse<Login.Response>
	}
}>
