// Import utilities
import domReady from './js/utils/domready.js'
// Import modules
import mainbody from './js/mainbody.js'

window.mainbody = mainbody

console.log(mainbody)

const init = () => {
	document.querySelector('body').appendChild(mainbody.$element)
}

domReady(init)
