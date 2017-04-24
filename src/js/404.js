// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/404.css'
// Import template
import _notfound from '../templates/404.eft'

const notfound = _notfound.render({
	$data: {
		class: sharedClasses
	},
	$methods: {
		recover() {
			notfound.$refs.box.classList.remove(classes.hidden)
		}
	}
})

notfound.$data.class = classes

export default notfound
