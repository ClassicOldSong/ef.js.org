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
const sectionList = []
const refs = {}

const show = ({value}) => {
	goto({value: `guide/${value}`})
	window.requestAnimationFrame(() => {
		// Something to do with ref
		console.log(`Reference for '${value}'`, refs[value])
	})
}

const items = [
	{
		title: 'Quick Start',
		ref: 'quickstart',
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
		ref: 'text',
		content: ''
	},
	{
		title: '» Attribute Binding',
		ref: 'attr',
		content: ''
	},
	{
		title: '» Property Binding',
		ref: 'prop',
		content: ''
	},
	{
		title: '» Event Binding',
		ref: 'event',
		content: ''
	},
	{
		title: '» Two way Binding',
		ref: 'two',
		content: ''
	},
	{
		title: 'Advanced Usage',
		ref: 'advanced',
		content: 'Advanced usage here'
	},
	{
		title: '» Modulelize',
		ref: 'module',
		content: ''
	},
	{
		title: '» AST Structure',
		ref: 'ast',
		content: ''
	}
]

for (let i of items) {
	indexList.push(_item.render({
		$data: Object.assign({}, i, {class: sharedClasses.item}),
		$methods: { show }
	}))

	const section = _section.render({$data: i})
	refs[i.ref] = section.$element
	sectionList.push(section)
}

const guide = _guide.render({
	$data: {
		class: sharedClasses
	},
	indexes: indexList,
	sections: sectionList
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

export default guide
