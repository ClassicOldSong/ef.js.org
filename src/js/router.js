// Import utilities
import domReady from './utils/domready.js'
// Import style
import headerClass from '../styles/header.css'
import notfoundClass from '../styles/404.css'
// Import components
import mainbody from './mainbody.js'
import header from './header.js'
import notfound from './404.js'
import home from './home.js'
import guide from './guide.js'
import api from './api.js'
import examples from './examples.js'

window.mainbody = mainbody

console.log(mainbody)

const classSelected = `${headerClass.link} ${headerClass.selected}`

const goto = ({value}) => {
	if (!(/^#!\//).test(value)) value = `#!/${value}`
	window.location.hash = value
}

const open = ({value}) => window.open(value)

const changePage = (path) => {
	const newClasses = {
		examples: headerClass.link,
		api: headerClass.link,
		guide: headerClass.link,
		home: headerClass.link,
	}

	switch (path) {
		case '#!/examples': {
			newClasses.examples = classSelected
			mainbody.body = examples
			break
		}
		case '#!/api': {
			newClasses.api = classSelected
			mainbody.body = api
			break
		}
		case '#!/guide': {
			newClasses.guide = classSelected
			mainbody.body = guide
			break
		}
		case '#!/home': {
			newClasses.home = classSelected
			mainbody.body = home
			break
		}
		default: {
			notfound.$nodes.box.classList.remove(notfoundClass.hidden)
			mainbody.body = notfound
			window.requestAnimationFrame(() => notfound.$nodes.box.classList.add(notfoundClass.hidden))
		}
	}

	header.$data.class = newClasses
	header.$nodes.overlay.classList.remove(headerClass.hidden)
	window.requestAnimationFrame(() => header.$nodes.overlay.classList.add(headerClass.hidden))
}

header.$methods.goto = goto
home.$methods = { goto, open }

window.addEventListener('hashchange', () => changePage(location.hash))

const init = () => {
	document.querySelector('body').appendChild(mainbody.$element)
	if (location.hash) changePage(location.hash)
	else goto({value: 'home'})
	header.$nodes.overlay.classList.remove(headerClass.hidden)
}

const onload = () => {
	window.removeEventListener('load', onload)
	header.$nodes.overlay.classList.add(headerClass.hidden)
}

window.addEventListener('load', onload)

domReady(init)

export { goto, open, changePage }
