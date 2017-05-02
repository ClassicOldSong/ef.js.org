import {inform, exec} from 'ef.js'
// Import utils
import domReady from './utils/domready.js'
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/home.css'
// Import template
import _home from '../templates/home.eft'

const home = new _home({
	$data: {
		class: sharedClasses
	}
})

home.$data.class = classes

const updateScroll = () => {
	let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	let width = window.innerWidth - 36

	inform()
	if (height > window.innerHeight * 3) {
		home.$data.position = 'absolute'
		home.$data.top = window.innerHeight * 3
		height = window.innerHeight * 3
	} else {
		home.$data.position = 'fixed'
		home.$data.top = '0'
	}
	if (width > 500) width = 500
	home.$data.scrollLeft = -1 * height / window.innerHeight * width
	exec()
}

// window.addEventListener('scroll', updateScroll)

domReady(updateScroll, true)

export { home, updateScroll }
