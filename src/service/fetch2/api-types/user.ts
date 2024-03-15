import { TsFetchTemplateDefineApis } from 'wtbx-type-safe-fetch'
import { ApiResponse } from '@/service/fetch2/type.ts'

export declare namespace Login {
	export type Body = {
		username: string
		password: string
	}
	export type Response = {
		token: string
	}
}

export declare namespace Profile {
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
		body: Login.Body
		response: ApiResponse<Login.Response>
	}
}>
