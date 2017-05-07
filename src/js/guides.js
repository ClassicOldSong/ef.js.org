import classes from '../styles/guides.css'
import _quickStart from '../templates/guides/quick-start.js'
import _EFML from '../templates/guides/efml.js'

const applyStyle = (state) => {
	state.$data.class = classes
}

const guides = {
	_quickStart,
	_EFML
}

export {applyStyle, guides}
