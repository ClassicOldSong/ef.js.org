// Import utils
// Import modules
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/examples.css'
// Import template
import _examples from '../templates/examples.eft'

const selected = `${classes.item} ${classes.selected}`

const info = {
	todo: {
		src: 'https://classicoldsong.github.io/todomvc-efjs/',
		repo: ''
	},
	dbmon: {
		src: 'https://classicoldsong.github.io/js-repaint-perfs/ef/index.html',
		repo: ''
	},
	site: {
		src: `${location.origin}${location.pathname}`,
		repo: ''
	}
}

const show = ({state, value}) => {
	const newClasses = {
		todo: classes.item,
		dbmon: classes.item,
		site: classes.item
	}
	newClasses[value] = selected
	state.$data.class = newClasses
	state.$data = info[value]
}

const examples = _examples.render({
	$data: {
		class: sharedClasses
	},
	$methods: { show }
})

examples.$data.class = classes
show({state: examples, value: 'todo'})

export default examples
