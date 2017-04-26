const r = Math.random

const draw = ({ctx, w, h}) => {
	const startX = r() * w,
		startY = r() * h,
		size = r() * 120
	ctx.beginPath()
	ctx.moveTo(startX, startY - size)
	ctx.lineTo(startX + size, startY)
	ctx.lineTo(startX, startY + size)
	ctx.lineTo(startX - size, startY)
	ctx.closePath()
	ctx.stroke()
}

const genBg = (cb) => {
	const c = document.createElement('canvas'),
		w = window.innerWidth,
		h = window.innerHeight,
		pr = window.devicePixelRatio || 1,
		ds = 42 / 1280 / 720 * w * h
	c.width = w * pr
	c.height = h * pr
	if (!c.toBlob) {
		c.toBlob = (cb) => {
			const dataURI = c.toDataURL(),
				binary = atob(dataURI.split(',')[1]),
				mime = dataURI.split(',')[0].split(':')[1].split(';')[0]
			let arr = []

			for (let i = 0; i < binary.length; i++) arr.push(binary.charCodeAt(i))
			cb(new Blob([new Uint8Array(arr)], {type: mime}))
		}
	}

	const ctx = c.getContext('2d')
	ctx.globalAlpha = 0.4
	ctx.scale(pr, pr)
	ctx.strokeStyle = '#FFB200'

	for (let i = 0; i < ds; i++) draw({ctx, w, h})

	c.toBlob(blob => cb(URL.createObjectURL(blob)))
}

export default genBg
