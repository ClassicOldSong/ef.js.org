// Import style
import sharedClasses from '../styles/shared.css'
import classes from '../styles/404.css'
// Import template
import _notfound from '../templates/404.eft'

const getNotfound = () => {
	const notfound = new _notfound({
		$data: {
			class: sharedClasses
		},
		$methods: {
			recover() {
				notfound.$data.class.logoHidden = classes.hidden
			}
		}
	})

	notfound.$data.class = classes
	return notfound
}

export default getNotfound
