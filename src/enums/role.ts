import { wenum } from 'wtbx-enum'

// 示範用 enum
const role = wenum(
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
