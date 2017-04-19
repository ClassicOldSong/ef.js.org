// Import utils
// Import modules
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/home.css'
// Import template
import _home from '../templates/home.eft'

const home = _home.render({
	$data: {
		class: sharedClasses
	}
})

home.$data.classes = classes

export default home
