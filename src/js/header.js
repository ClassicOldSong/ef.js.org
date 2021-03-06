// Import style
import classes from '../styles/header.css'
import shared from '../styles/shared.css'
// Import template
import _header from '../templates/header.eft'

const header = new _header({
	$data: {
		class: classes
	},
	$methods: {
		recover({state}) {
			state.$data.class.logoHidden = ''
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
