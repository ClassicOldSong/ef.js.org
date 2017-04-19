const path = require('path')

// Rollup plugins
const buble = require('rollup-plugin-buble')
const eslint = require('rollup-plugin-eslint')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const uglify = require('rollup-plugin-uglify')
const progress = require('rollup-plugin-progress')
const json = require('rollup-plugin-json')
const eft = require('rollup-plugin-eft')
const postcss = require('rollup-plugin-postcss')

// Postcss plugins
const postcssModules = require('postcss-modules')
const simplevars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssnext = require('postcss-cssnext')
const cssnano = require('cssnano')
const imageInliner = require('postcss-image-inliner')

// Other dependences
const git = require('git-rev-sync')

// ef configuration
const {
	entry = 'src/main.js',
	bundle = 'main.js',
	assets = 'src/assets',
	devPath = 'test',
	proPath = 'dist',
	limit = 10240,
	b64svg = false,
	format = 'iife',
	sourceMap = 'inline'
} = require('./ef.config.js')

const cssExportMap = {}

module.exports = {
	entry,
	bundle: path.normalize(bundle),
	assets: path.normalize(assets),
	devPath: path.normalize(devPath),
	proPath: path.normalize(proPath),
	limit,
	format,
	sourceMap,
	plugins: [
		progress({
			clearLine: false
		}),
		eslint(),
		resolve({
			jsnext: true,
			main: true,
			browser: true,
		}),
		commonjs(),
		json(),
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
				imageInliner({
					assetPaths: [assets],
					maxFileSize: limit,
					b64svg
				}),
				cssnano()
			],
			getExport(id) {
				return cssExportMap[id]
			},
			combineStyleTags: true
		}),
		replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
			GITVERSION: JSON.stringify(`${git.branch()}.${git.short()}`)
		}),
		buble({
			transforms: {
				modules: false,
				dangerousForOf: true
			},
			objedtAssign: 'Object.assign'
		}),
		(process.env.NODE_ENV === 'production' && uglify())
	]
}
