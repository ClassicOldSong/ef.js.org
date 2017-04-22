// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/guide.css'
// Import template
import _guide from '../templates/guide.eft'

const guide = _guide.render({
	$data: {
		class: sharedClasses
	}
})

guide.$data.class = classes

export default guide
