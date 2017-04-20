// Import modules
import { goto } from './router.js'
// Import style
import classes from '../styles/header.css'
import shared from '../styles/shared.css'
// Import template
import _header from '../templates/header.eft'

const header = _header.render({
	$data: {
		class: classes
	},
	$methods: {
		goto({value}) {
			goto(value)
		},
		recover() {
			header.$nodes.overlay.classList.remove(classes.hidden)
		}
	}
})

header.$data.class = {
	examples: classes.link,
	api: classes.link,
	guide: classes.link,
	home: classes.link
}

header.$data.class = shared

export default header
