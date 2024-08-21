export type CliOption = {
	cmd: string
	desc: string
	defaultValue: any
}

type FirstUppercase<S extends string> = S extends `${infer F}${infer R}`
	? `${Uppercase<F>}${R}`
	: S

type OptionName<
	Name extends string,
	Res extends string = '',
> = Name extends `${infer V}-${infer R}`
	? OptionName<R, `${Res}${Res extends '' ? V : FirstUppercase<V>}`>
	: Res extends ''
		? Name
		: `${Res}${FirstUppercase<Name>}`

export type ParsedOption<Opt extends CliOption> = Opt extends {
	cmd: infer Cmd
	defaultValue: infer ValType
}
	? Cmd extends `--${infer Name} ${infer R}`
		? Record<OptionName<Name>, ValType | undefined>
		: Cmd extends `--${infer Name}`
			? Record<OptionName<Name>, ValType | undefined>
			: never
	: never

export type ParsedArgv<Opts = { [key: string]: any }> = {
	args: ReadonlyArray<string>
	options: Opts
}
