console.log('[EF]', 'Build starting...')

const rollup = require('rollup').rollup
const watch = require('node-watch')
const browserSync = require('browser-sync').create()
const bsConfig = require('../config/bs-config')
const ah = require('./utils/assets-helper.js')
const path = require('path')
const md5File = require('md5-file')
const fs = require('fs-extra')
const {
	entry,
	bundle,
	assets,
	devPath,
	limit,
	format,
	sourceMap,
	plugins
} = require('../config/rollup.config')
const reload = browserSync.reload

const dest = `${devPath}/${bundle}`
const _assets = new RegExp(`^${assets}`)

let cache = {}
let shouldUpdate = true

const bundleWrite = (bundle) => {
	if (!shouldUpdate) return
	console.log('[EF]', 'Writing bundle...')
	cache = bundle
	bundle.write({ dest, format, sourceMap })
}

const reloadBrowser = () => {
	if (shouldUpdate) reload()
	else shouldUpdate = true
}

const errHandler = (err) => {
	console.log('Error at:', err.id)
	console.log(err.toString())
	shouldUpdate = false
}

const assetHandler = ({filename, fileList}) => {
	const hash = md5File.sync(filename)
	if (fileList[filename] === hash) return true
	fileList[filename] = hash
	if ((/\.html?|favicon\.(png|ico)/).test(filename)) {
		fs.copy(filename, `${devPath}/${path.relative(assets, filename)}`)
		return false
	}
	fs.lstat(filename, (err, stat) => {
		if (err) return console.log(err)
		if (stat.size > limit) fs.copy(filename, `${devPath}/${path.relative(assets, filename)}`)
	})
	return false
}

const startWatch = ({fileList, excludeHidden}) => () => {
	watch('src', (filename) => {
		if (!excludeHidden) return
		if (_assets.test(filename) && assetHandler({filename, fileList})) return
		console.log('[EF]', 'File changed:', filename)
		rollup({
			entry,
			plugins,
			cache
		})
		.catch(errHandler)
		.then(bundleWrite)
		.then(reloadBrowser)
	})
}

const build = (props) => {
	console.log('[EF]', 'Building...')
	rollup({
		entry,
		plugins
	})
	.then(bundleWrite)
	.then(() => console.log('[RD]', 'Build successful! Starting server...'))
	.then(() => browserSync.init(bsConfig))
	.then(startWatch(props))
}


fs.emptyDir(devPath, (err) => {
	if (err) return console.log(err)
	console.log('[EF]', 'Testing directory emptied.')
	ah({
		inPath: assets,
		outPath: devPath,
		limit,
		build
	})
})
