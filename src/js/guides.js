import classes from '../styles/guides.css'
import _quickStart from '../templates/guides/quick-start.eft'
import _EFML from '../templates/guides/efml.eft'
import _basicBinding from '../templates/guides/basic-binding.eft'
import _twoWayBinding from '../templates/guides/two-way-binding.eft'
import _valueSubscribing from '../templates/guides/value-subscribing.eft'
import _eventsHandling from '../templates/guides/events-handling.eft'
import _mounting from '../templates/guides/mounting.eft'
import _bundledRendering from '../templates/guides/bundled-rendering.eft'
import _modulize from '../templates/guides/modulize.eft'
import _digIntoEf from '../templates/guides/dig-into-ef.eft'
import _astStructure from '../templates/guides/ast-structure.eft'

const applyStyle = (state) => {
	state.$data.class = classes
	return state
}

const _guides = {
	_quickStart,
	_EFML,
	_basicBinding,
	_twoWayBinding,
	_valueSubscribing,
	_eventsHandling,
	_mounting,
	_bundledRendering,
	_modulize,
	_digIntoEf,
	_astStructure
}

export { applyStyle, _guides }
