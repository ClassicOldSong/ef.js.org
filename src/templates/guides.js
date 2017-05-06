import classes from '../styles/guides.css'
import _quickStart from './guides/quick-start.js'

const applyStyle = (state) => {
	state.$data.class = classes
}

const guides = {
	_quickStart
}

export {applyStyle, guides}
