import { wenum } from 'wtbx-enum'

// 示範用 enum(有改過就可以砍掉這段註解)
export const role = wenum(
	() =>
		({
			SUPER: {
				value: '1',
				level: 100,
			},
			USER: {
				value: '2',
				level: 200,
			},
		}) as const,
)

export type UserRole = typeof role.keys extends (infer K)[] ? K : string
