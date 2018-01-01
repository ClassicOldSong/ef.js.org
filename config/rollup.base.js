import path from 'path'
import chalk from 'chalk'

// Rollup plugins
import buble from 'rollup-plugin-buble'
import eslint from 'rollup-plugin-eslint'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import uglify from 'rollup-plugin-uglify'
import progress from 'rollup-plugin-progress'
import json from 'rollup-plugin-json'
import eft from 'rollup-plugin-eft'
import postcss from 'rollup-plugin-postcss'
import string from 'rollup-plugin-string'

// Postcss plugins
import postcssModules from 'postcss-modules'
import simplevars from 'postcss-simple-vars'
import nested from 'postcss-nested'
import cssnext from 'postcss-cssnext'
import cssnano from 'cssnano'

// ef configuration
import efConfig from './ef.config.js'
const {
	input,
	name,
	bundle,
	devPath,
	proPath
} = efConfig

// Log build environment
console.log('Target:', chalk.bold.green(process.env.NODE_ENV || 'development'))
switch (process.env.BUILD_ENV) {
	case 'DEMO': {
		console.log(chalk.cyan('--=+| DEMO BUILD |+=--'))
		break
	}
	case 'CI': {
		console.log(chalk.green('--=+| CI BUILD |+=--'))
		break
	}
	default: {
		console.log(chalk.yellow('--=+| NORMAL BUILD |+=--'))
	}
}

const cssExportMap = {}

export default {
	input,
	name,
	bundle: path.normalize(bundle),
	devPath: path.normalize(devPath),
	proPath: path.normalize(proPath),
	plugins: [
		progress({
			clearLine: false
		}),
		eslint({
			exclude: ['**/*.efml', '**/*.tjs']
		}),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs(),
		json(),
		string({
			include: ['**/*.efml', '**/*.tjs']
		}),
		eft(),
		postcss({
			plugins: [
				simplevars(),
				nested(),
				cssnext({ warnForDuplicates: false }),
				postcssModules({
					getJSON(id, exportTokens) {
						cssExportMap[id] = exportTokens
					}
				}),
				cssnano()
			],
			getExport(id) {
				return cssExportMap[id]
			},
			combineStyleTags: true
		}),
		replace({
			'process.env.NODE_ENV': "'development'"
		}),
		buble({
			transforms: {
				modules: false,
				dangerousForOf: true
			},
			objectAssign: 'Object.assign'
		}),
		(process.env.NODE_ENV === 'production' && uglify())
	]
}
