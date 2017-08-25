// Import base config
import base from './rollup.base'
// Import browsersync config
import bsConfig from './bs-config'
// Import dev plugins
import browsersync from 'rollup-plugin-browsersync'

const {input, name, plugins, devPath, bundle} = base

// Add browser-sync plugin
plugins.push(browsersync(bsConfig))

const config = {
	input,
	output: {
		name,
		file: `${devPath}/${bundle}.js`,
		format: 'iife',
		sourcemap: true,
	},
	plugins,
	watch: {
		chokidar: true,
		include: 'src/'
	}
}

export default config
