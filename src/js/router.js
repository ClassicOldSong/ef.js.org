import {inform, exec} from 'ef.js'
// Import utilities
import page from 'page'
import domReady from './utils/domready.js'
// Import style
import headerClass from '../styles/header.css'
import notfoundClass from '../styles/404.css'
import mainClass from '../styles/mainbody.css'
// Import components
import { mainbody, getBg } from './mainbody.js'
import header from './header.js'
import notfound from './404.js'
import { home, updateScroll as updateScrollHome } from './home.js'
import { guide, guides } from './guide.js'
import api from './api.js'
import examples from './examples.js'

window.mainbody = mainbody

console.log(mainbody)

const classSelected = `${headerClass.link} ${headerClass.selected}`

const goto = ({value}) => {
	window.scrollTo(0, 0)
	page(value)
}

const open = ({value}) => window.open(value)

const changePage = (path) => {
	if (path) header.$data.class[path] = classSelected

	header.$data.class.logoHidden = ''
	window.requestAnimationFrame(() => {
		header.$data.class.logoHidden = headerClass.hidden
	})
}

page('/*', (ctx) => {
	if (ctx.path === '/') page.redirect('home')
	else page.redirect(ctx.path.replace(/^\/+/, ''))
})
page('home', () => {
	inform()
	mainbody.body = home
	window.addEventListener('scroll', updateScrollHome)
	updateScrollHome()
	changePage('home')
	exec()
})
page.exit('home', (ctx, next) => {
	window.removeEventListener('scroll', updateScrollHome)
	next()
})
page('guide', () => {
	page.redirect('guide/quick-start')
})
page('api', () => {
	inform()
	mainbody.body = api
	changePage('api')
	exec()
})
page('examples', () => {
	inform()
	mainbody.body = examples
	changePage('examples')
	exec()
})
page('guide/:ref', (ctx) => {
	inform()
	if (!(ctx.params.ref in guides)) {
		mainbody.body = notfound
		return exec()
	}

	const {title, component} = guides[ctx.params.ref]
	guide.$data.title = title
	guide.section = component

	mainbody.body = guide
	changePage('guide')
	exec()
})
page('*', () => {
	inform()
	mainbody.body = notfound
	notfound.$data.class.logoHidden = ''
	window.requestAnimationFrame(() => {
		notfound.$data.class.logoHidden = notfoundClass.hidden
	})
	changePage()
	exec()
})
page.exit('*', (ctx, next) => {
	header.$data.class[ctx.path.split('/')[0]] = headerClass.link
	next()
})

page({hashbang: true})

header.$methods.goto = goto
header.$methods.getBg = getBg
examples.$methods.open = open
home.$methods = { goto, open }

const init = () => {
	mainbody.$mount(document.body)
	header.$data.class.logoHidden = ''
}

const onload = () => {
	window.removeEventListener('load', onload)
	header.$data.class.logoHidden = headerClass.hidden
	mainbody.$data.class.shown = mainClass.show
}

window.addEventListener('load', onload)

domReady(init)

export { goto, open }
