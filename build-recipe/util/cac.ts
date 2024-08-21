import cac from 'cac'
import { type CliOption, type ParsedArgv } from '../type/common'

export function bootstrapCac<Opts>({
	options,
}: {
	options: ReadonlyArray<CliOption>
}): ParsedArgv<Opts> {
	const cli = cac()
	for (let i = 0; i < options.length; i++) {
		const { cmd, desc, defaultValue } = options[i]
		cli.option(cmd, desc, defaultValue ? { default: defaultValue } : undefined)
	}
	cli.help()
	return cli.parse() as ParsedArgv<Opts>
}
