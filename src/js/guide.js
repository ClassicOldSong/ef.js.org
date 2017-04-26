// Import utils
import { goto } from './router.js'
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/guide.css'
// Import template
import _guide from '../templates/guide.eft'
import _item from '../templates/index-item.eft'
import _section from '../templates/guide-section.eft'

const indexList = []
const guides = {}

const show = ({value}) => {
	goto({value: `guide/${value}`})
}

const items = [
	{
		title: 'Quick Start',
		ref: 'quick-start',
		content: 'Quick start guide here'
	},
	{
		title: 'EFML',
		ref: 'efml',
		content: 'EFML start guide here'
	},
	{
		title: '» Tags',
		ref: 'tags',
		content: ''
	},
	{
		title: '» Text Binding',
		ref: 'text-binding',
		content: ''
	},
	{
		title: '» Attribute Binding',
		ref: 'attribute-binding',
		content: ''
	},
	{
		title: '» Property Binding',
		ref: 'property-binding',
		content: ''
	},
	{
		title: '» Event Binding',
		ref: 'event-binding',
		content: ''
	},
	{
		title: 'Advanced Usage',
		ref: 'advanced-usage',
		content: 'Advanced usage here'
	},
	{
		title: '» Classname Handling',
		ref: 'classname-handling',
		content: ''
	},
	{
		title: '» Style Handling',
		ref: 'style-handling',
		content: ''
	},
	{
		title: '» Two way Binding',
		ref: 'two-way-binding',
		content: ''
	},
	{
		title: '» Modulelize',
		ref: 'modulelize',
		content: ''
	},
	{
		title: 'Dig into ef',
		ref: 'dig-into-ef',
		content: ''
	},
	{
		title: '» AST Structure',
		ref: 'ast-structure',
		content: ''
	}
]

for (let i of items) {
	const { title, ref, content } = i
	indexList.push(_item.render({
		$data: {
			class: sharedClasses.item,
			ref,
			title
		},
		$methods: { show }
	}))

	guides[ref] = {
		title,
		component: _section.render({$data: {content}})
	}
}

const guide = _guide.render({
	$data: {
		class: sharedClasses
	},
	indexes: indexList
})
guide.$data.class = classes

const updateScroll = () => {
	const height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
	if (document.body.scrollHeight - window.innerHeight - height < 150 && window.innerWidth > 640) {
		guide.$refs.index.style.position = 'absolute'
		guide.$refs.index.style.top = `${document.body.scrollHeight - window.innerHeight - 10}px`
	} else {
		guide.$refs.index.style.position = 'fixed'
		guide.$refs.index.style.top = 'initial'
	}
}

window.addEventListener('scroll', updateScroll)

export { guide, guides }
