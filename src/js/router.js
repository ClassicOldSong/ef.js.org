// Import utilities
import page from 'page'
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

// page('/#!')

window.mainbody = mainbody

console.log(mainbody)

const classSelected = `${headerClass.link} ${headerClass.selected}`

const goto = ({value}) => {
	page(value)
	window.scrollTo(0, 0)
}

const open = ({value}) => window.open(value)

const changePage = (path) => {
	if (path) header.$data.class[path] = classSelected

	header.$refs.overlay.classList.remove(headerClass.hidden)
	window.requestAnimationFrame(() => header.$refs.overlay.classList.add(headerClass.hidden))
}

page('/*', (ctx) => {
	if (ctx.path === '/') page.redirect('home')
	else page.redirect(ctx.path.slice(1))
})
page('home', () => {
	mainbody.body = home
	changePage('home')
})
page('guide', () => {
	mainbody.body = guide
	changePage('guide')
})
page('api', () => {
	mainbody.body = api
	changePage('api')
})
page('examples', () => {
	mainbody.body = examples
	changePage('examples')
})
page('guide/:ref', (ctx) => {
	mainbody.body = guide
	changePage('guide')
	window.requestAnimationFrame(() => {
		guide.$data.ref = ctx.params.ref
	})
})
page('*', () => {
	notfound.$refs.box.classList.remove(notfoundClass.hidden)
	mainbody.body = notfound
	window.requestAnimationFrame(() => notfound.$refs.box.classList.add(notfoundClass.hidden))
	changePage()
})
page.exit('*', (ctx, next) => {
	header.$data.class[ctx.path.split('/')[0]] = headerClass.link
	next()
})

page({hashbang: true})

header.$methods.goto = goto
examples.$methods.open = open
home.$methods = { goto, open }

// window.addEventListener('hashchange', () => changePage(location.hash))

const init = () => {
	document.querySelector('body').appendChild(mainbody.$element)
	header.$refs.overlay.classList.remove(headerClass.hidden)
}

const onload = () => {
	window.removeEventListener('load', onload)
	header.$refs.overlay.classList.add(headerClass.hidden)
}

window.addEventListener('load', onload)

domReady(init)

export { goto, open }
