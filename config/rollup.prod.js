// Import base config
import base from './rollup.base'

const {input, name, plugins, proPath, bundle} = base

const config = {
	input,
	output: {
		name,
		file: `${proPath}/${bundle}.js`,
		format: 'iife',
		sourcemap: true
	},
	plugins
}

export default config
