import { inform, exec } from 'ef.js'
import Prism from 'prismjs'
// Import utils
import { goto } from './router.js'
import efmlSyntax from './utils/prism-efml.js'
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/guide.css'
// Import template
import _guide from '../templates/guide.eft'
import _item from '../templates/index-item.eft'
import { applyStyle, _guides } from './guides.js'
// Import codes
import code1 from '../templates/guides/codes/code1.tjs'
import code2 from '../templates/guides/codes/code2.efml'
import code3 from '../templates/guides/codes/code3.tjs'
import code4 from '../templates/guides/codes/code4.efml'

const indexList = []
const guides = {}
const cache = {}

const show = ({value}) => {
	goto({value: `guides/${value}`})
}

const items = [
	{
		title: 'Quick Start',
		ref: 'quick-start',
		content: _guides._quickStart,
		state: {
			$data: {
				code1: Prism.highlight(code1, Prism.languages.javascript),
				code2: Prism.highlight(code2, efmlSyntax),
				code3: Prism.highlight(code3, Prism.languages.javascript),
				code4: Prism.highlight(code4, efmlSyntax)
			}
		}
	},
	{
		title: 'EFML',
		ref: 'efml',
		content: _guides._EFML
	},
	{
		title: 'Basic Binding',
		ref: 'basic-binding',
		content: _guides._basicBinding
	},
	{
		title: 'Two-way Binding',
		ref: 'two-way-binding',
		content: _guides._twoWayBinding
	},
	{
		title: 'Events handling',
		ref: 'events-handling',
		content: _guides._eventsHandling
	},
	{
		title: 'Mounting',
		ref: 'mounting',
		content: _guides._mounting
	},
	{
		title: 'Bundled Rendering',
		ref: 'bundled-rendering',
		content: _guides._bundledRendering
	}
	// {
	// 	title: '» Tags',
	// 	ref: 'tags',
	// 	content: ''
	// },
	// {
	// 	title: '» Text Binding',
	// 	ref: 'text-binding',
	// 	content: ''
	// },
	// {
	// 	title: '» Attribute Binding',
	// 	ref: 'attribute-binding',
	// 	content: ''
	// },
	// {
	// 	title: '» Property Binding',
	// 	ref: 'property-binding',
	// 	content: ''
	// },
	// {
	// 	title: '» Event Binding',
	// 	ref: 'event-binding',
	// 	content: ''
	// },
	// {
	// 	title: 'Advanced Usage',
	// 	ref: 'advanced-usage',
	// 	content: 'Advanced usage here'
	// },
	// {
	// 	title: '» Classname Handling',
	// 	ref: 'classname-handling',
	// 	content: ''
	// },
	// {
	// 	title: '» Style Handling',
	// 	ref: 'style-handling',
	// 	content: ''
	// },
	// {
	// 	title: '» Two way Binding',
	// 	ref: 'two-way-binding',
	// 	content: ''
	// },
	// {
	// 	title: '» Modulelize',
	// 	ref: 'modulelize',
	// 	content: ''
	// },
	// {
	// 	title: 'Dig into ef',
	// 	ref: 'dig-into-ef',
	// 	content: ''
	// },
	// {
	// 	title: '» AST Structure',
	// 	ref: 'ast-structure',
	// 	content: ''
	// }
]

for (let i of items) {
	const { title, ref, content, state } = i
	indexList.push(new _item({
		$data: {
			class: sharedClasses.item,
			ref,
			title
		},
		$methods: { show }
	}))

	Object.defineProperty(guides, ref, {
		get() {
			return {
				title,
				component: cache[ref] || (cache[ref] = applyStyle(new content(state)))
			}
		}
	})
}

const getGuide = () => {
	const guide = new _guide({
		$data: {
			class: sharedClasses
		},
		indexes: indexList
	})
	guide.$data.class = classes

	const updateScroll = () => {
		const height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
		const position = document.body.scrollHeight - window.innerHeight - height
		inform()
		if (height > 0 && position > -height && position < 150 && window.innerWidth > 640) {
			guide.$data.position = 'absolute'
			guide.$data.top = `${document.body.scrollHeight - window.innerHeight - 10}px`
		} else {
			guide.$data.position = 'fixed'
			guide.$data.top = 'initial'
		}
		exec()
	}

	return { guide, updateScroll }
}

export { getGuide, guides }
