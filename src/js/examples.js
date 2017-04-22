// Import utils
import { open } from './router.js'
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/examples.css'
// Import template
import _examples from '../templates/examples.eft'

const selected = `${classes.item} ${classes.selected}`

const info = {
	todo: {
		src: 'https://classicoldsong.github.io/todomvc-efjs/',
		repo: 'https://github.com/ClassicOldSong/todomvc-efjs',
		class: {
			todo: selected,
			dbmon: classes.item,
			site: classes.item
		}
	},
	dbmon: {
		src: 'https://classicoldsong.github.io/js-repaint-perfs/ef/index.html',
		repo: 'https://github.com/ClassicOldSong/js-repaint-perfs',
		class: {
			todo: classes.item,
			dbmon: selected,
			site: classes.item
		}
	},
	site: {
		src: `${location.origin}${location.pathname}`,
		repo: 'https://github.com/ClassicOldSong/ef.js.org',
		class: {
			todo: classes.item,
			dbmon: classes.item,
			site: selected
		}
	}
}

const show = ({state, value}) => {
	state.$data = info[value]
}

const examples = _examples.render({
	$data: {
		class: sharedClasses
	},
	$methods: { show, open }
})

examples.$data.class = classes
show({state: examples, value: 'todo'})

export default examples
