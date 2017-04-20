// Import utils
// Import modules
// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/examples.css'
// Import template
import _examples from '../templates/examples.eft'

const examples = _examples.render({
	$data: {
		class: sharedClasses
	}
})

examples.$data.class = classes

export default examples
