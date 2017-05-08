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
import getNotfound from './404.js'
import getHome from './home.js'
import { getGuide, guides } from './guide.js'
import getApi from './api.js'
import getExamples from './examples.js'

window.mainbody = mainbody

// console.log(mainbody)

const cache = {}

const goto = ({value}) => {
	window.scrollTo(0, 0)
	page(value)
}

const open = ({value}) => window.open(value)

const changePage = (_path) => {
	if (_path) header.$data.class[_path] = headerClass.selected

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
	if (!cache.home) {
		const {home, updateScroll} = getHome()
		cache.home = {home, updateScroll}
		home.$methods = { goto, open }
	}
	const {home, updateScroll} = cache.home
	mainbody.body = home
	window.addEventListener('scroll', updateScroll)
	updateScroll()
	changePage('home')
	exec()
})
page.exit('home', (ctx, next) => {
	window.removeEventListener('scroll', cache.home.updateScroll)
	next()
})
page('guides', () => {
	page.redirect('guides/quick-start')
})
page('api', () => {
	inform()
	if (!cache.api) cache.api = getApi()
	mainbody.body = cache.api
	changePage('api')
	exec()
})
page('examples', () => {
	inform()
	if (!cache.examples) {
		const {examples, updateScroll} = getExamples()
		cache.examples = {examples, updateScroll}
		examples.$methods.open = open
	}
	window.addEventListener('scroll', cache.examples.updateScroll)
	mainbody.body = cache.examples.examples
	cache.examples.updateScroll()
	changePage('examples')
	exec()
})
page.exit('examples', (ctx, next) => {
	window.removeEventListener('scroll', cache.examples.updateScroll)
	next()
})
page('guides/:ref', (ctx) => {
	inform()
	if (!(ctx.params.ref in guides)) {
		if (!cache.notfound) cache.notfound = getNotfound()
		mainbody.body = cache.notfound
		return exec()
	}

	const {title, component} = guides[ctx.params.ref]
	if (!cache.guide) {
		const {guide, updateScroll} = getGuide()
		cache.guide = {guide, updateScroll}
	}
	window.addEventListener('scroll', cache.guide.updateScroll)
	cache.guide.guide.$data.title = title
	cache.guide.guide.section = component

	cache.guide.updateScroll()

	mainbody.body = cache.guide.guide
	changePage('guides')
	exec()
})
page.exit('guides/*', (ctx, next) => {
	window.removeEventListener('scroll', cache.guide.updateScroll)
	next()
})
page('*', () => {
	inform()
	if (!cache.notfound) cache.notfound = getNotfound()
	mainbody.body = cache.notfound
	cache.notfound.$data.class.logoHidden = ''
	window.requestAnimationFrame(() => {
		cache.notfound.$data.class.logoHidden = notfoundClass.hidden
	})
	changePage()
	exec()
})
page.exit('*', (ctx, next) => {
	header.$data.class[ctx.path.split('/')[0]] = ''
	next()
})

page({hashbang: true})

header.$methods.goto = goto
header.$methods.getBg = getBg

const init = () => {
	mainbody.$mount({target: document.body})
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
