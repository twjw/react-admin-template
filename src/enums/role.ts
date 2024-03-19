// type Eval = string | number | boolean
//
// type FunName<S extends string> =
//   S extends `${infer A}${infer B}`
//     ? RStrip<`${Uppercase<A & string>}${B & string}`, 's'>
//     : RStrip<S, 's'>
//
// type RStrip<S extends string, R extends string> = S extends `${infer A}${R}`
//   ? A
//   : S
//
// type EnumInstance<T extends Record<string, Eval[]>> = {
//   [K in keyof T as `getBy${FunName<K & string>}`]: (val: T[K][number], key: RStrip<(keyof T) & string, 's'>) => void
// } & {
//   [K in keyof T]: T[K]
// }
//
// function createEnum <T extends Record<string, Eval[]>>(
//   data: () => T
// ): EnumInstance<T> {
//   const _data = data()
//   const result = _data as EnumInstance<T>
//
//   function getByKeyVal (this: keyof T, val: Eval, key: string) {
//     console.log(this, val, key)
//   }
//
//   for (let k in _data) {
//     (result[`getBy${k[0].toUpperCase()}${k.substring(1, k.length - 1)}`] as any) = getByKeyVal.bind(k)
//   }
//
//   console.log(result)
//
//   return result
// }

type Eval = string | number | boolean

type UppercaseFirst<S extends string> = S extends `${infer A}${infer B}`
	? `${Uppercase<A & string>}${B & string}`
	: S

type EnumInstance<T extends Record<string, Record<string, Eval>>, LK extends string> = {
	[K in keyof T]: T[K]
} & {
	[RLK in keyof T]: {
		[K in keyof T[RLK] as `getBy${UppercaseFirst<K & string>}`]: {
			<
				PV extends K extends keyof T[keyof T] ? T[keyof T][K] : never,
				PK extends keyof T[RLK] | LK,
			>(
				val: PV,
				key: PK,
			): PK extends LK ? RLK : T[RLK][PK]
		}
	}
}[keyof T] & {
		[K in '0' as `getBy${UppercaseFirst<LK>}`]: <
			PV extends keyof T,
			PK extends keyof T[PV] | LK,
		>(
			val: PV,
			key: PK,
		) => PK extends LK ? PV : T[PV][PK]
	} & { map: <R = void>(callback: <PL extends keyof T>(label: PL, value: T[PL]) => R) => void }

function createEnum<
	T extends Record<string, Record<string, Eval>>,
	LK extends string = 'label',
>(data: () => T, labelKey = 'label' as LK): EnumInstance<T, LK> {
	const _data = data()
	const result = _data as EnumInstance<T, LK>

	function getByKeyVal(this: keyof T, val: Eval, key: string) {
		console.log(this, val, key)
	}

	for (let k in _data) {
		for (const k2 in _data[k]) {
			;(result[`getBy${k2[0].toUpperCase()}${k2.substring(1)}`] as any) = getByKeyVal.bind(k2)
		}
		break
	}

	;(result[`getBy${labelKey[0].toUpperCase()}${labelKey.substring(1)}`] as any) =
		getByKeyVal.bind(labelKey)

	console.log(result)

	return result
}

const a = createEnum(
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

const e1 = a.getByLabel('USER', 'label')
const e2 = a.getByValue('1', 'label')
const e3 = a.getByLevel(200, 'value')

a.map((k, v) => {
	return 1
})
