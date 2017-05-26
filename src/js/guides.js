import classes from '../styles/guides.css'
import _quickStart from '../templates/guides/quick-start.eft'
import _EFML from '../templates/guides/efml.eft'
import _basicBinding from '../templates/guides/basic-binding.eft'
import _twoWayBinding from '../templates/guides/two-way-binding.eft'

const applyStyle = (state) => {
	state.$data.class = classes
	return state
}

const _guides = {
	_quickStart,
	_EFML,
	_basicBinding,
	_twoWayBinding
}

export { applyStyle, _guides }
