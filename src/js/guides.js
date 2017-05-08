import classes from '../styles/guides.css'
import _quickStart from '../templates/guides/quick-start.eft'
import _EFML from '../templates/guides/efml.eft'

const applyStyle = (state) => {
	state.$data.class = classes
	return state
}

const _guides = {
	_quickStart,
	_EFML
}

export { applyStyle, _guides }
