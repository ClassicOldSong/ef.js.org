import { inform, exec } from 'ef.js'
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/examples.css'
// Import template
import _examples from '../templates/examples.eft'

const selected = `${sharedClasses.item} ${sharedClasses.selected}`

const info = {
	todo: {
		src: 'https://classicoldsong.github.io/todomvc-efjs/',
		repo: 'https://github.com/ClassicOldSong/todomvc-efjs',
		class: {
			todo: selected,
			dbmon: sharedClasses.item,
			site: sharedClasses.item
		}
	},
	dbmon: {
		src: 'https://classicoldsong.github.io/js-repaint-perfs/ef/opt.html',
		repo: 'https://github.com/ClassicOldSong/js-repaint-perfs',
		class: {
			todo: sharedClasses.item,
			dbmon: selected,
			site: sharedClasses.item
		}
	},
	site: {
		src: `${location.origin}${location.pathname}`,
		repo: 'https://github.com/ClassicOldSong/ef.js.org',
		class: {
			todo: sharedClasses.item,
			dbmon: sharedClasses.item,
			site: selected
		}
	}
}

const show = ({state, value}) => {
	state.$data = info[value]
}

const getExamples = () => {
	const examples = new _examples({
		$data: {
			class: sharedClasses
		},
		$methods: { show }
	})

	examples.$data.class = classes
	show({state: examples, value: 'todo'})

	const updateScroll = () => {
		const height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
		const position = document.body.scrollHeight - window.innerHeight - height
		inform()
		if (height > 0 && position > -height && position < 150 && window.innerWidth > 640) {
			examples.$data.position = 'absolute'
			examples.$data.top = `${document.body.scrollHeight - window.innerHeight - 10}px`
		} else {
			examples.$data.position = 'fixed'
			examples.$data.top = 'initial'
		}
		exec()
	}

	return {examples, updateScroll}
}

export default getExamples
