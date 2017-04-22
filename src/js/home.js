// Import utils
import domReady from './utils/domready.js'
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/home.css'
// Import template
import _home from '../templates/home.eft'

const home = _home.render({
	$data: {
		class: sharedClasses
	}
})

home.$data.class = classes

const updateScroll = () => {
	let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	let width = window.innerWidth - 36

	if (height > window.innerHeight * 3) {
		home.$nodes.box.style.position = 'absolute'
		home.$nodes.box.style.top = `${window.innerHeight * 3}px`
		height = window.innerHeight * 3
	} else {
		home.$nodes.box.style.position = 'fixed'
		home.$nodes.box.style.top = '0'
	}
	if (width > 500) width = 500
	const scrollLeft = `translate3d(-${height / window.innerHeight * width}px, 0px, 0px)`
	home.$nodes.logo.style.transform = `rotateZ(${height / window.innerHeight * 90 + 45}deg) translate3d(0px, 0px, 0px)`
	home.$nodes.titles.style.transform = scrollLeft
	home.$nodes.captions.style.transform = scrollLeft
}

window.addEventListener('scroll', updateScroll)

domReady(updateScroll, true)

export default home
