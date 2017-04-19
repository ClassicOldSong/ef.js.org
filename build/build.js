console.log('[EF]', 'Build starting...')

require('shelljs/global')
env.NODE_ENV = 'production'

const rollup = require('rollup').rollup
const fs = require('fs-extra')
const ah = require('./utils/assets-helper.js')
const {
	entry,
	bundle,
	assets,
	proPath,
	limit,
	format,
	plugins
} = require('../config/rollup.config')

const dest = `${proPath}/${bundle}`

const build = () => {
	console.log('[EF]', 'Building...')
	rollup({
		entry,
		plugins
	})
	.then((bundle) => {
		console.log('[EF]', 'Writing bundle...')
		bundle.write({ dest, format })
	})
	.then(() => console.log('[EF]', 'Build successful!'))
}

fs.emptyDir(proPath, (err) => {
	if (err) return console.log(err)
	console.log('[EF]', 'Distribution directory emptied.')
	ah({
		inPath: assets,
		outPath: proPath,
		limit,
		build
	})
})
