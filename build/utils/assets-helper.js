const klaw = require('klaw')
const fs = require('fs-extra')
const path = require('path')
const through2 = require('through2')
const md5File = require('md5-file')

const excludeHidden = (item) => {
	const basename = path.basename(item)
	return basename === '.' || basename[0] !== '.'
}

const excludeDir = through2.obj(function(item, enc, next) {
	if (!item.stats.isDirectory()) this.push(item)
	next()
})

const ah = ({inPath, outPath, limit = 10240, build}) => {
	console.log('[EF]', 'Copying assets...')
	const fileList = {}
	klaw(inPath, {filter: excludeHidden})
	.pipe(excludeDir)
	.on('data', (item) => {
		if (item.stats.size > limit || (/(\.html?|favicon\.(png|ico))$/).test(item.path)) {
			const _path = path.relative(inPath, item.path)
			const _inPath = path.normalize(`${inPath}/${_path}`)
			const _outPath = path.normalize(`${outPath}/${_path}`)
			fileList[_inPath] = md5File.sync(_inPath)
			console.log('[EF]', `Copying ${_inPath} to ${_outPath}`)
			fs.ensureFile(_outPath, (err) => {
				if (err) console.log(err)
				fs.copy(_inPath, _outPath)
			})
		}
	})
	.on('end', () => {
		console.log('[EF]', 'Assets copied.')
		build({fileList, excludeHidden})
	})
}

module.exports = ah
