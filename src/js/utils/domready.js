const fns = []
const asyncFns = []

let domLoaded = false

const exeAsync = fn => setTimeout(fn, 0)

const domReady = (fn, _async = false) => {
	if (typeof fn !== 'function') return
	if (domLoaded) {
		if (_async) exeAsync(fn)
		else fn()
		return
	}
	if (_async) asyncFns.push(fn)
	else fns.push(fn)
}

const init = () => {
	for (let i of fns) i()
}

const initAsync = () => {
	document.removeEventListener('DOMContentLoaded', initAsync, false)
	domLoaded = true
	asyncFns.push(init)
	for (let i of asyncFns) exeAsync(i)
}

document.addEventListener('DOMContentLoaded', initAsync, false)
if (document.readyState === "interactive" || document.readyState === "complete") initAsync()

export default domReady
