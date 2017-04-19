// Import style
import headerClass from '../styles/header.css'
// Import components
import header from './header.js'

const changePage = (path) => {
	const newClasses = {
		examples: headerClass.link,
		api: headerClass.link,
		guide: headerClass.link,
		home: headerClass.link,
	}
	newClasses[path.substr(3)] = `${headerClass.link} ${headerClass.selected}`
	header.$data.class = newClasses
}

const goto = (path) => {
	window.location.hash = `#!/${path}`
}

window.addEventListener('hashchange', () => changePage(location.hash))

export { goto, changePage }
